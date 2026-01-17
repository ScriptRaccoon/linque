import { set_auth_cookie } from '$lib/server/auth'
import { query } from '$lib/server/db'
import { RateLimiter } from '$lib/server/ratelimit'
import { password_schema, username_schema } from '$lib/server/schemas'
import { fail, redirect, type Actions } from '@sveltejs/kit'
import bcrypt from 'bcrypt'
import * as v from 'valibot'

const limiter = new RateLimiter({ limit: 5, window_ms: 60_000 })

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
		const password = form.get('password') as string

		const username_parsed = v.safeParse(username_schema, username)

		if (!username_parsed.success) {
			return fail(400, {
				error: username_parsed.issues[0].message,
			})
		}

		const password_parsed = v.safeParse(password_schema, password)

		if (!password_parsed.success) {
			return fail(400, { error: password_parsed.issues[0].message })
		}

		const password_hash = await bcrypt.hash(password, 10)

		const { rows: users, err } = await query<{ id: number }>(
			'INSERT INTO users (username, password_hash) VALUES (?,?) RETURNING ID',
			[username, password_hash],
		)

		if (err) {
			if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
				return fail(400, { error: 'Username is already taken' })
			}
			return fail(500, { error: 'Internal Server Error' })
		}

		if (!users.length) {
			return fail(500, { error: 'Internal Server Error' })
		}

		limiter.record(ip)

		const { id } = users[0]

		set_auth_cookie(event, { id, profile_id: null })

		return redirect(303, '/create')
	},
}
