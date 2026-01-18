type State = {
	count: number
	window_start: number
}

export class RateLimiter {
	private limit: number
	private window_ms: number
	private map = new Map<string, State>()

	constructor(options: { limit: number; window_ms: number }) {
		this.limit = options.limit
		this.window_ms = options.window_ms
	}

	is_allowed(ip: string): boolean {
		const now = Date.now()
		const state = this.map.get(ip)

		if (!state) return true

		if (now - state.window_start >= this.window_ms) {
			return true
		}

		return state.count < this.limit
	}

	record(ip: string): void {
		const now = Date.now()
		const state = this.map.get(ip)

		if (!state || now - state.window_start >= this.window_ms) {
			this.map.set(ip, { count: 1, window_start: now })
			return
		}

		state.count++
	}

	clear(ip: string): void {
		this.map.delete(ip)
	}
}
