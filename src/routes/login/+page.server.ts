import { query } from '$lib/server/db'
import { fail, redirect, type Actions } from '@sveltejs/kit'
import bcrypt from 'bcrypt'
import type { PageServerLoad } from './$types'
import { Rate_Limiter } from '$lib/server/ratelimit'
import { COOKIE_OPTIONS, set_auth_cookie } from '$lib/server/auth'

export const load: PageServerLoad = (event) => {
	const LOGIN_MESSAGES: Record<string, undefined | string> = {
		logout: 'You have been logged out.',
	}

	const from = event.url.searchParams.get('from') ?? ''
	return { message: LOGIN_MESSAGES[from] }
}

const limiter = new Rate_Limiter({ limit: 5, window_ms: 60_000 })

export const actions: Actions = {
	default: async (event) => {
		const ip = event.getClientAddress()

		if (!limiter.is_allowed(ip)) {
			return fail(429, { error: 'Too many login attempts. Try again later.' })
		}

		const form = await event.request.formData()
		const username = form.get('username') as string
		const password = form.get('password') as string

		if (!username || !password) {
			return fail(400, { error: 'Username and password required' })
		}

		const sql = `
		SELECT
			u.id, 
			u.password_hash,
			p.id as page_id,
			p.displayname
		FROM
			users u
		LEFT JOIN
			link_pages p
		ON
			u.id = p.user_id
		WHERE
			u.username = ?
		`

		const { rows, err } = await query<{
			id: number
			password_hash: string
			page_id: number | null
			displayname: string | null
		}>(sql, [username])

		if (err) {
			return fail(500, { error: 'Internal Server Error' })
		}

		if (!rows.length) {
			return fail(401, { error: 'Invalid credentials' })
		}

		const { id, password_hash, page_id, displayname } = rows[0]

		const is_correct = await bcrypt.compare(password, password_hash)

		if (!is_correct) {
			return fail(401, { error: 'Invalid credentials' })
		}

		limiter.clear(ip)

		set_auth_cookie(event, { id, page_id })
		if (displayname) event.cookies.set('displayname', displayname, COOKIE_OPTIONS)

		if (page_id === null) {
			redirect(303, '/create')
		} else {
			redirect(303, '/links')
		}
	},
}
