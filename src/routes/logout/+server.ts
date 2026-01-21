import { redirect } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { delete_auth_cookie } from '$lib/server/auth'
import { delete_displayname_cookie } from '$lib/server/displayname'

export const GET: RequestHandler = (event) => {
	delete_auth_cookie(event)
	delete_displayname_cookie(event)
	return redirect(307, '/login?from=logout')
}
