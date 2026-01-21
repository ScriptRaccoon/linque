import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { query } from '$lib/server/db'
import { RateLimiter } from '$lib/server/ratelimit'
import { validate_token } from '$lib/server/tokens'

const limiter = new RateLimiter({ limit: 10, window_ms: 10_000 })

export const PATCH: RequestHandler = async (event) => {
	const ip = event.getClientAddress()

	if (!limiter.is_allowed(ip)) {
		return json({ message: 'Too many link clicks. Try again later.' }, { status: 429 })
	}

	const link_id = event.params.id
	const token = event.url.searchParams.get('token')

	if (token === null) {
		return json({ message: 'Token required' }, { status: 401 })
	}

	if (!validate_token(token)) {
		return json({ message: 'Invalid token' }, { status: 401 })
	}

	const sql = 'UPDATE links SET click_count = click_count + 1 WHERE id = ?'

	const { err } = await query<{ url: string }>(sql, [link_id])

	if (err) {
		return json({ message: 'Internal Server Error' }, { status: 500 })
	}

	return json({ message: 'Link click has been tracked' })
}
