import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async (event) => {
	const displayname = event.cookies.get('displayname')
	return { user: event.locals.user, displayname }
}
