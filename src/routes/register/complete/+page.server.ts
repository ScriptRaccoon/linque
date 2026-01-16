import { set_auth_cookie } from '$lib/server/auth'
import { query } from '$lib/server/db'
import { Rate_Limiter } from '$lib/server/ratelimit'
import { bio_schema } from '$lib/server/schemas'
import { displayname_schema } from '$lib/server/schemas'
import { error, fail, redirect, type Actions } from '@sveltejs/kit'
import * as v from 'valibot'

const limiter = new Rate_Limiter({ limit: 5, window_ms: 60_000 })

export const actions: Actions = {
	default: async (event) => {
		const user = event.locals.user

		if (!user) {
			error(401, 'Unauthorized')
		}

		const ip = event.getClientAddress()

		if (!limiter.is_allowed(ip)) {
			return fail(420, { error: 'Too many registrations. Try again later' })
		}

		const form = await event.request.formData()
		const displayname = form.get('displayname') as string
		const bio = (form.get('bio') as string) || null

		const displayname_parsed = v.safeParse(displayname_schema, displayname)

		if (!displayname_parsed.success) {
			return fail(400, { error: displayname_parsed.issues[0].message })
		}

		const bio_parsed = v.safeParse(bio_schema, bio)

		if (!bio_parsed.success) {
			return fail(400, { type: 'bio', error: bio_parsed.issues[0].message })
		}

		const { err } = await query(
			'UPDATE users SET displayname = ?, bio = ?, profile_completed = 1 WHERE id = ?',
			[displayname, bio, user.id],
		)

		if (err) {
			if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
				return fail(400, { error: 'Try a different display name' })
			}
			return fail(500, { error: 'Internal Server Error' })
		}

		set_auth_cookie(event, { id: user.id, displayname, profile_completed: 1 })

		return redirect(303, '/links')
	},
}
