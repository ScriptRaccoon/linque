type Options = {
	limit: number
	window_ms: number
}

type State = {
	count: number
	window_start: number
}

export class Rate_Limiter {
	private limit: number
	private window_ms: number
	private map = new Map<string, State>()

	constructor(options: Options) {
		this.limit = options.limit
		this.window_ms = options.window_ms
	}

	is_allowed(ip: string): boolean {
		const now = Date.now()
		const state = this.map.get(ip)

		if (!state) {
			this.map.set(ip, { count: 1, window_start: now })
			return true
		}

		if (now - state.window_start >= this.window_ms) {
			state.window_start = now
			state.count = 1
			return true
		}

		if (state.count >= this.limit) {
			return false
		}

		state.count++
		return true
	}

	clear(ip: string): void {
		this.map.delete(ip)
	}
}
