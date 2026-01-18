export const COOKIE_DISPLAYNAME = 'displayname'

export const COOKIE_OPTIONS = {
	httpOnly: true,
	path: '/',
	maxAge: 60 * 60 * 24 * 7, // 1w
	sameSite: 'strict',
	secure: true,
} as const
