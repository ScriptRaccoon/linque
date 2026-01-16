import { query } from '$lib/server/db'
import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { generate_token } from '$lib/server/tokens'

export const load: PageServerLoad = async (event) => {
	const slug = event.params.slug
	const name = slug.substring(1)

	const { rows: users, err: err_user } = await query<{ id: number }>(
		'SELECT id FROM users WHERE displayname = ?',
		[name],
	)

	if (err_user) {
		error(500, 'Internal Server Error')
	}

	if (!users.length) {
		error(404, 'Not Found')
	}

	const user_id = users[0].id

	const { rows: links, err } = await query<{ id: string; url: string; label: string }>(
		'SELECT id, url, label FROM links WHERE user_id = ? ORDER BY position',
		[user_id],
	)

	if (err) {
		error(500, 'Internal Server Error')
	}

	const token = generate_token()

	return { links, name, token, linkpage: true }
}
