import { error, redirect } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { query } from '$lib/server/db'
import { Rate_Limiter } from '$lib/server/ratelimit'
import { validate_token } from '$lib/server/tokens'

const limiter = new Rate_Limiter({ limit: 10, window_ms: 10_000 })

export const GET: RequestHandler = async (event) => {
	const ip = event.getClientAddress()

	if (!limiter.is_allowed(ip)) {
		error(429, 'Too many link clicks. Try again later.')
	}

	const link_id = event.params.id
	const token = event.url.searchParams.get('token')

	const valid = token !== null && validate_token(token)

	if (!valid) {
		error(401, 'Invalid token')
	}

	const { rows, err } = await query<{ url: string }>(
		'UPDATE links SET click_count = click_count + 1 WHERE id = ? RETURNING url',
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
