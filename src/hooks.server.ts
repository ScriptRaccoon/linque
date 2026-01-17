import { authenticate } from '$lib/server/auth'
import { initialize_db } from '$lib/server/db'
import { redirect, type Handle, type ServerInit } from '@sveltejs/kit'

const auth_routes = ['/account', '/links', '/register/complete']
const created_page_routes = ['/account', '/links']

const matches_route = (pathname: string, routes: string[]) =>
	routes.some((route) => pathname.startsWith(route))

export const handle: Handle = async ({ event, resolve }) => {
	authenticate(event)

	const pathname = event.url.pathname
	const user = event.locals.user

	if (!user && matches_route(pathname, auth_routes)) {
		redirect(307, '/login')
	}

	if (user && user.page_id === null && matches_route(pathname, created_page_routes)) {
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
