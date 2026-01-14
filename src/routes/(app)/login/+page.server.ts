import { query } from '$lib/server/db'
import { fail, redirect, type Actions } from '@sveltejs/kit'
import bcrypt from 'bcrypt'
import type { PageServerLoad } from './$types'
import { Rate_Limiter } from '$lib/server/ratelimit'
import { set_auth_cookie } from '$lib/server/auth'

export const load: PageServerLoad = (event) => {
	const LOGIN_MESSAGES: Record<string, undefined | string> = {
		logout: 'You have been logged out.',
		register: 'Registration successful. You can now log in.',
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

		const { rows, err } = await query<{ id: number; password_hash: string }>(
			'SELECT id, password_hash FROM users WHERE username = ?',
			[username],
		)

		if (err) {
			return fail(500, { error: 'Internal Server Error' })
		}

		if (!rows.length) {
			return fail(401, { error: 'Invalid credentials' })
		}

		const { id: user_id, password_hash } = rows[0]

		const is_correct = await bcrypt.compare(password, password_hash)

		if (!is_correct) {
			return fail(401, { error: 'Invalid credentials' })
		}

		limiter.clear(ip)

		set_auth_cookie(event, user_id)

		return redirect(303, '/app')
	},
}
