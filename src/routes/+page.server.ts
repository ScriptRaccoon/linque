import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './(app)/$types'

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		redirect(303, '/links')
	}
}
