import { authenticate } from '$lib/server/auth'
import { redirect, type Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
	authenticate(event)

	const requires_auth = event.url.pathname.startsWith('/app')

	if (requires_auth && !event.locals.user) {
		redirect(307, '/login')
	}

	return await resolve(event)
}
