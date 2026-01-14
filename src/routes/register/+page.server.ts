import { MINIMAL_PASSWORD_LENGTH } from '$lib/server/config'
import { query } from '$lib/server/db'
import { Rate_Limiter } from '$lib/server/ratelimit'
import { fail, redirect, type Actions } from '@sveltejs/kit'
import bcrypt from 'bcrypt'

const limiter = new Rate_Limiter({ limit: 5, window_ms: 60_000 })

export const actions: Actions = {
	default: async (event) => {
		const ip = event.getClientAddress()

		if (!limiter.is_allowed(ip)) {
			return fail(420, {
				error: 'Too many registrations. Try again later',
			})
		}

		const form = await event.request.formData()
		const username = form.get('username') as string
		const displayname = form.get('displayname') as string
		const password = form.get('password') as string

		if (!username) {
			return fail(400, {
				error: 'Username required',
			})
		}

		if (!displayname) {
			return fail(400, {
				error: 'Display name required',
			})
		}

		if (!password) {
			return fail(400, { error: 'Password required' })
		}

		if (password.length < MINIMAL_PASSWORD_LENGTH) {
			return fail(400, {
				error: `Password must be at least ${MINIMAL_PASSWORD_LENGTH} characters`,
			})
		}

		const password_hash = await bcrypt.hash(password, 10)

		const { err } = await query(
			'INSERT INTO users (username, displayname, password_hash) VALUES (?,?,?)',
			[username, displayname, password_hash],
		)

		if (err) {
			if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
				return fail(400, { error: 'Try a different username or displayname' })
			}
			return fail(500, { error: 'Internal Server Error' })
		}

		return redirect(303, '/login?from=register')
	},
}
