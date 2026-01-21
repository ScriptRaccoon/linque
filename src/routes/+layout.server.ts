import { get_displayname } from '$lib/server/displayname'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async (event) => {
	const displayname = get_displayname(event)
	return { user: event.locals.user, displayname }
}
