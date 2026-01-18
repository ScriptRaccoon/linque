import crypto from 'crypto'

const tokens = new Map<string, number>()
const expiration_ms = 5 * 60 * 1000 // 5 min

export function generate_token(): string {
	const token = crypto.randomBytes(16).toString('hex')
	const expires_at = Date.now() + expiration_ms
	tokens.set(token, expires_at)
	return token
}

export function validate_token(token: string): boolean {
	cleanup_tokens()
	const expires_at = tokens.get(token)
	if (!expires_at) return false
	if (Date.now() > expires_at) {
		tokens.delete(token)
		return false
	}
	return true
}

function cleanup_tokens(): void {
	const now = Date.now()
	for (const [token, expires_at] of tokens.entries()) {
		if (expires_at <= now) tokens.delete(token)
	}
}
