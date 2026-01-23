import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async (event) => {
	const from = event.url.searchParams.get('from')

	if (from === 'delete') {
		return { message: 'Your account has been deleted' }
	}
}
