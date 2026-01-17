import { error, json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import * as v from 'valibot'
import { query } from '$lib/server/db'

const request_schema = v.object({
	pos_1: v.pipe(v.number(), v.integer()),
	pos_2: v.pipe(v.number(), v.integer()),
})

export const PATCH: RequestHandler = async (event) => {
	const user = event.locals.user
	if (!user || user.profile_id === null) {
		error(401, 'Unauthorized')
	}

	const body: unknown = await event.request.json()

	const parsed = v.safeParse(request_schema, body)

	if (!parsed.success) {
		error(400, 'Invalid request body')
	}

	const { pos_1, pos_2 } = parsed.output

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

	const args = [pos_1, pos_2, pos_2, pos_1, user.id]

	const { err } = await query(sql, args)

	if (err) {
		return error(500, 'Internal Server Error')
	}

	return json({ message: 'Links have been swapped' })
}
