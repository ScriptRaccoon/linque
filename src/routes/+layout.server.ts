import { COOKIE_DISPLAYNAME } from '$lib/server/config'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async (event) => {
	const displayname = event.cookies.get(COOKIE_DISPLAYNAME)
	return { user: event.locals.user, displayname }
}
