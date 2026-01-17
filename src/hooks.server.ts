import { authenticate } from '$lib/server/auth'
import { initialize_db } from '$lib/server/db'
import { redirect, type Handle, type ServerInit } from '@sveltejs/kit'

const auth_routes = ['/account', '/links', '/create']
const profile_routes = ['/account', '/links']

const matches_route = (pathname: string, routes: string[]) =>
	routes.some((route) => pathname.startsWith(route))

export const handle: Handle = async ({ event, resolve }) => {
	authenticate(event)

	const pathname = event.url.pathname
	const user = event.locals.user

	if (!user && matches_route(pathname, auth_routes)) {
		redirect(307, '/login')
	}

	if (user && user.profile_id === null && matches_route(pathname, profile_routes)) {
		redirect(307, '/create')
	}

	if (user && pathname === '/') {
		redirect(307, '/links')
	}

	return resolve(event)
}

export const init: ServerInit = async () => {
	await initialize_db()
}
