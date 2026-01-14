import { error, redirect } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { query } from '$lib/server/db'
import { Rate_Limiter } from '$lib/server/ratelimit'

const limiter = new Rate_Limiter({ limit: 10, window_ms: 10_000 })

export const GET: RequestHandler = async (event) => {
	const ip = event.getClientAddress()

	if (!limiter.is_allowed(ip)) {
		error(429, 'Too many link clicks. Try again later.')
	}

	const link_id = Number(event.params.id)

	const { rows, err } = await query<{ url: string }>(
		`UPDATE links
         SET click_count = click_count + 1
         WHERE id = ?
		 RETURNING url`,
		[link_id],
	)

	if (err) {
		error(500, 'Internal Server Error')
	}

	if (!rows.length) {
		error(404, 'Not Found')
	}

	const { url } = rows[0]

	redirect(302, url)
}
