import { error, fail, type Actions } from '@sveltejs/kit'
import { query } from '$lib/server/db'
import * as v from 'valibot'
import { bio_schema, displayname_schema } from '$lib/server/schemas'
import type { PageServerLoad } from './$types'
import { COOKIE_OPTIONS } from '$lib/server/auth'

export const load: PageServerLoad = async (event) => {
	const user = event.locals.user
	if (!user || user.page_id === null) {
		error(401, 'Unauthorized')
	}

	const { rows, err } = await query<{ displayname: string; bio: string | null }>(
		'SELECT displayname, bio FROM link_pages WHERE id = ?',
		[user.page_id],
	)

	if (err || !rows.length) {
		error(500, 'Internal Server Error')
	}

	const { displayname, bio } = rows[0]

	const page_url = `${event.url.origin}/@${displayname}`

	return { displayname, bio, page_url }
}

export const actions: Actions = {
	displayname: async (event) => {
		const user = event.locals.user
		if (!user || user.page_id === null) {
			error(401, 'Unauthorized')
		}

		const form = await event.request.formData()
		const displayname = form.get('displayname') as string

		const displayname_parsed = v.safeParse(displayname_schema, displayname)

		if (!displayname_parsed.success) {
			return fail(400, {
				type: 'displayname',
				error: displayname_parsed.issues[0].message,
			})
		}

		const { err } = await query('UPDATE link_pages SET displayname = ? WHERE id = ?', [
			displayname,
			user.page_id,
		])

		if (err) {
			if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
				return fail(400, { error: 'Display name is already taken' })
			}
			return fail(500, { type: 'displayname', error: 'Internal Server Error' })
		}

		event.cookies.set('displayname', displayname, COOKIE_OPTIONS)

		return { type: 'displayname', message: 'Displayname has been updated' }
	},

	bio: async (event) => {
		const user = event.locals.user
		if (!user || user.page_id === null) {
			error(401, 'Unauthorized')
		}

		const form = await event.request.formData()
		const bio = form.get('bio') as string

		const bio_parsed = v.safeParse(bio_schema, bio)

		if (!bio_parsed.success) {
			return fail(400, { type: 'bio', error: bio_parsed.issues[0].message })
		}

		const { err } = await query('UPDATE link_pages SET bio = ? WHERE id = ?', [
			bio,
			user.page_id,
		])

		if (err) {
			return fail(500, { type: 'bio', error: 'Internal Server Error' })
		}

		return { type: 'bio', message: 'Bio has been updated' }
	},
}
