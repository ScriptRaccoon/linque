import { authenticate } from '$lib/server/auth'
import { initialize_db } from '$lib/server/db'
import { redirect, type Handle, type ServerInit } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
	authenticate(event)

	const requires_auth =
		event.url.pathname.startsWith('/account') || event.url.pathname.startsWith('/links')

	if (requires_auth && !event.locals.user) {
		redirect(307, '/login')
	}

	return await resolve(event)
}

export const init: ServerInit = async () => {
	await initialize_db()
}
