// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user?: { id: number }
		}
		interface PageData {
			user?: { id: number }
			linkpage?: boolean
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {}
