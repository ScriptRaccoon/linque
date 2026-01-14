import type { RequestEvent } from '@sveltejs/kit'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '$env/static/private'

const COOKIE_AUTH_TOKEN = 'auth_token'

const COOKIE_OPTIONS = {
	httpOnly: true,
	path: '/',
	maxAge: 60 * 60 * 24 * 7, // 1w
	sameSite: 'strict',
	secure: true,
} as const

export function authenticate(event: RequestEvent): void {
	const token = event.cookies.get(COOKIE_AUTH_TOKEN)
	if (!token) return
	try {
		const payload = jwt.verify(token, JWT_SECRET) as { user_id: number }
		event.locals.user = { id: payload.user_id }
	} catch (_) {}
}

export function set_auth_cookie(event: RequestEvent, user_id: number): void {
	const token = jwt.sign({ user_id }, JWT_SECRET, { expiresIn: '1w' })
	event.cookies.set(COOKIE_AUTH_TOKEN, token, COOKIE_OPTIONS)
}

export function delete_auth_cookie(event: RequestEvent): void {
	event.cookies.delete(COOKIE_AUTH_TOKEN, { path: '/' })
}
