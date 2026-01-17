import { COOKIE_OPTIONS, set_auth_cookie } from '$lib/server/auth'
import { query } from '$lib/server/db'
import { bio_schema } from '$lib/server/schemas'
import { displayname_schema } from '$lib/server/schemas'
import { encode_spaces } from '$lib/utils'
import { error, fail, redirect, type Actions } from '@sveltejs/kit'
import * as v from 'valibot'

export const actions: Actions = {
	default: async (event) => {
		const user = event.locals.user

		if (!user) {
			error(401, 'Unauthorized')
		}

		if (user.profile_id !== null) {
			return fail(403, { error: 'Profile already exists' })
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

		const displayname_db = encode_spaces(displayname)

		const sql = `
			INSERT INTO profiles
				(displayname, bio, user_id)
			VALUES
				(?,?,?)
			RETURNING id`

		const { rows, err } = await query<{ id: number }>(sql, [displayname_db, bio, user.id])

		if (err) {
			if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
				return fail(400, { error: 'Display name is already taken' })
			}
			return fail(500, { error: 'Internal Server Error' })
		}

		if (!rows.length) {
			return fail(500, { error: 'Internal Server Error' })
		}

		const profile_id = rows[0].id

		set_auth_cookie(event, { id: user.id, profile_id })
		event.cookies.set('displayname', displayname_db, COOKIE_OPTIONS)

		return redirect(303, '/links')
	},
}
