import { error, redirect } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { query } from '$lib/server/db'
import { RateLimiter } from '$lib/server/ratelimit'
import { validate_token } from '$lib/server/tokens'

const limiter = new RateLimiter({ limit: 10, window_ms: 10_000 })

export const GET: RequestHandler = async (event) => {
	const ip = event.getClientAddress()

	if (!limiter.is_allowed(ip)) {
		error(429, 'Too many link clicks. Try again later.')
	}

	const link_id = event.params.id
	const token = event.url.searchParams.get('token')

	const sql_without_tracking = 'SELECT url FROM links WHERE id = ?'

	const sql_with_tracking =
		'UPDATE links SET click_count = click_count + 1 WHERE id = ? RETURNING url'

	const sql =
		token !== null && validate_token(token) ? sql_with_tracking : sql_without_tracking

	const { rows, err } = await query<{ url: string }>(sql, [link_id])

	if (err) {
		error(500, 'Internal Server Error')
	}

	if (!rows.length) {
		error(404, 'Not Found')
	}

	const { url } = rows[0]

	limiter.record(ip)

	redirect(302, url)
}
