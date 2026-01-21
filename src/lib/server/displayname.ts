import type { RequestEvent } from '@sveltejs/kit'
import { COOKIE_OPTIONS } from './config'

const COOKIE_DISPLAYNAME = 'displayname'

export function set_displayname_cookie(event: RequestEvent, displayname: string) {
	event.cookies.set(COOKIE_DISPLAYNAME, displayname, COOKIE_OPTIONS)
}

export function delete_displayname_cookie(event: RequestEvent) {
	event.cookies.delete(COOKIE_DISPLAYNAME, { path: '/' })
}

export function get_displayname(event: RequestEvent) {
	return event.cookies.get(COOKIE_DISPLAYNAME)
}
