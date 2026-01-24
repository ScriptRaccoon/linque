import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { query } from '$lib/server/db'

export const PATCH: RequestHandler = async (event) => {
	const user = event.locals.user

	if (!user) {
		return json({ error: 'Unauthorized' }, { status: 401 })
	}

	const link_id = event.params.id

	const { err } = await query(
		'UPDATE links SET is_public = 0 WHERE user_id = ? and id = ?',
		[user.id, link_id],
	)

	if (err) {
		return json({ error: 'Internal Server Error' }, { status: 500 })
	}

	return json({ message: 'Link has been published' })
}
