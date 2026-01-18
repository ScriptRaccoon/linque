import { error, fail } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'
import { query, is_constraint_error } from '$lib/server/db'
import * as v from 'valibot'
import { label_schema, url_schema } from '$lib/server/schemas'

type LinkItem = {
	id: string
	url: string
	label: string
	position: number
	click_count: number
}

export const load: PageServerLoad = async (event) => {
	const user = event.locals.user
	if (!user || user.profile_id === null) {
		error(401, 'Unauthorized')
	}

	const sql = `
        SELECT id, url, label, position, click_count
        FROM links
        WHERE user_id = ?
        ORDER BY position`

	const { rows: links, err } = await query<LinkItem>(sql, [user.id])

	if (err) {
		error(500, 'Internal Server Error')
	}

	return { links }
}

export const actions: Actions = {
	add: async (event) => {
		const user = event.locals.user

		if (!user) {
			return fail(401, {
				type: 'add',
				error: 'Unauthorized',
			})
		}

		const form = await event.request.formData()
		const label = form.get('label') as string
		const url = form.get('url') as string

		const label_parsed = v.safeParse(label_schema, label)

		if (!label_parsed.success) {
			return fail(400, {
				type: 'add',
				error: label_parsed.issues[0].message,
			})
		}

		const url_parsed = v.safeParse(url_schema, url)

		if (!url_parsed.success) {
			return fail(400, {
				type: 'add',
				error: url_parsed.issues[0].message,
			})
		}

		const link_id = crypto.randomUUID()

		const sql = `
			INSERT INTO links (id, label, url, user_id, position)
			SELECT ?, ?, ?, ?, COALESCE(MAX(position), 0) + 1
			FROM links
			WHERE links.user_id = ?`

		const { err } = await query(sql, [link_id, label, url, user.id, user.id])

		if (err) {
			if (is_constraint_error(err)) {
				return fail(409, {
					type: 'add',
					error: 'Duplicates are not allowed',
				})
			}

			return fail(500, {
				type: 'add',
				error: 'Internal Server Error',
			})
		}

		return {
			type: 'add',
			message: 'Link has been added',
		}
	},

	delete: async (event) => {
		const user = event.locals.user

		if (!user) {
			return fail(401, {
				type: 'delete',
				error: 'Unauthorized',
			})
		}

		const form = await event.request.formData()
		const link_id = form.get('id') as string

		const { err } = await query('DELETE FROM links WHERE user_id = ? AND id = ?', [
			user.id,
			link_id,
		])

		if (err) {
			return fail(500, {
				type: 'delete',
				error: 'Internal Server Error',
			})
		}

		return { type: 'delete', message: 'Link has been deleted' }
	},
}
