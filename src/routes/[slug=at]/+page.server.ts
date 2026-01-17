import { query } from '$lib/server/db'
import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { generate_token } from '$lib/server/tokens'

export const load: PageServerLoad = async (event) => {
	const slug = event.params.slug
	const displayname = slug.substring(1)

	const { rows: pages, err: err_page } = await query<{
		page_id: number
		bio: string | null
	}>('SELECT id as page_id, bio FROM link_pages where displayname = ?', [displayname])

	if (err_page) {
		error(500, 'Internal Server Error')
	}

	if (!pages.length) {
		error(404, 'Not Found')
	}

	const { page_id, bio } = pages[0]

	const { rows: links, err: err_links } = await query<{
		id: string
		url: string
		label: string
	}>('SELECT id, url, label FROM links WHERE page_id = ? ORDER BY position', [page_id])

	if (err_links) {
		error(500, 'Internal Server Error')
	}

	const token = generate_token()

	const is_linkpage = !event.url.searchParams.has('preview')

	return {
		displayname,
		bio,
		links,
		token,
		is_linkpage,
	}
}
