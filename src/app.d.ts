import type { User } from '$lib/types'

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
			linkpage?: boolean
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {}
