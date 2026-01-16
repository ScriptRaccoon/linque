import { authenticate } from '$lib/server/auth'
import { initialize_db } from '$lib/server/db'
import { redirect, type Handle, type ServerInit } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
	authenticate(event)

	const requires_auth =
		event.url.pathname.startsWith('/account') ||
		event.url.pathname.startsWith('/links') ||
		event.url.pathname.startsWith('/register/complete')

	const requires_completed_profile =
		event.url.pathname.startsWith('/account') || event.url.pathname.startsWith('/links')

	const requires_guest = event.url.pathname === '/'

	if (requires_auth && !event.locals.user) {
		redirect(307, '/login')
	} else if (
		event.locals.user &&
		!event.locals.user.profile_completed &&
		requires_completed_profile
	) {
		redirect(307, '/register/complete')
	} else if (requires_guest && event.locals.user) {
		redirect(307, '/links')
	}

	return await resolve(event)
}

export const init: ServerInit = async () => {
	await initialize_db()
}
