import { get_displayname } from '$lib/server/displayname'
import { MAX_BIO_LENGTH } from '$lib/server/schemas'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async (event) => {
	const displayname = get_displayname(event)
	return { user: event.locals.user, displayname, max_bio_length: MAX_BIO_LENGTH }
}
