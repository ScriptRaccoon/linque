import { query } from '$lib/server/db'
import { Rate_Limiter } from '$lib/server/ratelimit'
import { displayname_schema, password_schema, username_schema } from '$lib/server/schemas'
import { fail, redirect, type Actions } from '@sveltejs/kit'
import bcrypt from 'bcrypt'
import * as v from 'valibot'

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

		const username_parsed = v.safeParse(username_schema, username)

		if (!username_parsed.success) {
			return fail(400, {
				error: username_parsed.issues[0].message,
			})
		}

		const displayname_parsed = v.safeParse(displayname_schema, displayname)

		if (!displayname_parsed.success) {
			return fail(400, {
				error: displayname_parsed.issues[0].message,
			})
		}

		const password_parsed = v.safeParse(password_schema, password)

		if (!password_parsed.success) {
			return fail(400, { error: password_parsed.issues[0].message })
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
