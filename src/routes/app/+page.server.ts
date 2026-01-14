import { error, fail } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'
import { query } from '$lib/server/db'
import * as v from 'valibot'
import { label_schema, url_schema } from '$lib/server/schemas'

export const load: PageServerLoad = async (event) => {
	const user = event.locals.user
	if (!user) {
		error(401, 'Unauthorized')
	}

	const { rows, err } = await query<{ displayname: string }>(
		'SELECT displayname FROM users WHERE id = ?',
		[user.id],
	)

	if (err || !rows.length) {
		error(500, 'Internal Server Error')
	}

	const { displayname } = rows[0]

	const sql = `
        SELECT
            id, url, label, position
        FROM
            links
        WHERE
            user_id = ?
        ORDER BY
            position`

	const { rows: links, err: links_err } = await query<{
		id: number
		url: string
		label: string
		position: number
	}>(sql, [user.id])

	if (links_err) {
		error(500, 'Internal Server Error')
	}

	return { links, displayname }
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

		const sql = `
			INSERT INTO
				links (label, url, user_id, position)
			SELECT
				?,
				?,
				?,
				COALESCE(MAX(position), 0) + 1
			FROM
				links
			WHERE
				links.user_id = ?`

		const { err } = await query(sql, [label, url, user.id, user.id])

		if (err) {
			if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
				return fail(400, {
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
				type: 'edit',
				error: 'Unauthorized',
			})
		}

		const form = await event.request.formData()
		const link_id = parseInt(form.get('id') as string)

		const { err } = await query('DELETE FROM links WHERE user_id = ? AND id = ?', [
			user.id,
			link_id,
		])

		if (err) {
			return fail(500, {
				type: 'edit',
				error: 'Internal Server Error',
			})
		}

		return { type: 'edit', message: 'Link has been deleted' }
	},

	swap: async (event) => {
		const user = event.locals.user

		if (!user) {
			return fail(401, {
				type: 'edit',
				error: 'Unauthorized',
			})
		}

		const form = await event.request.formData()
		const position_a = Number(form.get('position_a') as string)
		const position_b = Number(form.get('position_b') as string)

		if (!Number.isInteger(position_a) || !Number.isInteger(position_b)) {
			return fail(400, {
				type: 'edit',
				error: 'Positions must be integers',
			})
		}

		const sql = `
			UPDATE links
			SET
				position = CASE position
					WHEN ? THEN ?
					WHEN ? THEN ?
					ELSE position
				END
			WHERE
				user_id = ?`

		const args = [position_a, position_b, position_b, position_a, user.id]

		const { err } = await query(sql, args)

		if (err) {
			return fail(500, {
				type: 'edit',
				error: 'Internal Server Error',
			})
		}
	},
}
