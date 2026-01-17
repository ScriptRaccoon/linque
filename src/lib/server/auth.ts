import type { RequestEvent } from '@sveltejs/kit'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '$env/static/private'

export type UserPayload = { id: number; page_id: number | null }

const COOKIE_AUTH_TOKEN = 'auth_token'

export const COOKIE_OPTIONS = {
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
		event.locals.user = jwt.verify(token, JWT_SECRET) as UserPayload
	} catch (_) {}
}

export function set_auth_cookie(event: RequestEvent, user: UserPayload): void {
	const token = jwt.sign(user, JWT_SECRET, { expiresIn: '1w' })
	event.cookies.set(COOKIE_AUTH_TOKEN, token, COOKIE_OPTIONS)
}

export function delete_auth_cookie(event: RequestEvent): void {
	event.cookies.delete(COOKIE_AUTH_TOKEN, { path: '/' })
}
