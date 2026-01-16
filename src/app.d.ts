import type { UserPayload } from '$lib/server/auth'

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user?: UserPayload
		}
		interface PageData {
			user?: UserPayload
			linkpage?: boolean
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {}
