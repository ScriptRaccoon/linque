import type { User } from '$lib/server/auth'

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user?: User
		}
		interface PageData {
			user?: User
			displayname?: string
			is_linkpage?: boolean
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {}
