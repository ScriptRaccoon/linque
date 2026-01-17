import { redirect } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { delete_auth_cookie } from '$lib/server/auth'

export const GET: RequestHandler = (event) => {
	delete_auth_cookie(event)
	event.cookies.delete('displayname', { path: '/' })
	return redirect(307, '/login?from=logout')
}
