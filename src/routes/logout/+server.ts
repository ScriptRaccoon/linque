import { redirect } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { delete_auth_cookie } from '$lib/server/auth'
import { COOKIE_DISPLAYNAME } from '$lib/server/config'

export const GET: RequestHandler = (event) => {
	delete_auth_cookie(event)
	event.cookies.delete(COOKIE_DISPLAYNAME, { path: '/' })
	return redirect(307, '/login?from=logout')
}
