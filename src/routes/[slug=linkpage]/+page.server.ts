import { query } from '$lib/server/db'
import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { generate_token } from '$lib/server/tokens'

export const load: PageServerLoad = async (event) => {
	const slug = event.params.slug
	const displayname = slug.substring(1)

	const sql_profile = 'SELECT user_id, bio FROM profiles where displayname = ?'

	const { rows: profiles, err: err_profile } = await query<{
		user_id: number
		bio: string | null
	}>(sql_profile, [displayname])

	if (err_profile) {
		error(500, 'Internal Server Error')
	}

	if (!profiles.length) {
		error(404, 'Not Found')
	}

	const { user_id, bio } = profiles[0]

	const sql_links = `
		SELECT id, url, label
		FROM links
		WHERE user_id = ? AND is_public = 1
		ORDER BY position`

	const { rows: links, err: err_links } = await query<{
		id: string
		url: string
		label: string
	}>(sql_links, [user_id])

	if (err_links) {
		error(500, 'Internal Server Error')
	}

	const token = generate_token()

	return {
		displayname,
		bio,
		links,
		token,
		is_linkpage: true,
	}
}
