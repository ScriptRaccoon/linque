import { DB_AUTH_TOKEN, DB_URL } from '$env/static/private'
import { createClient, type LibsqlError } from '@libsql/client'

export const db = createClient({
	authToken: DB_AUTH_TOKEN,
	url: DB_URL,
})

async function adjust_database() {
	try {
		await db.executeMultiple('PRAGMA foreign_keys = ON; PRAGMA journal_mode = WAL;')
	} catch (err) {
		const libsql_error = err as LibsqlError
		console.error(libsql_error.message)
	}
}

adjust_database()

export async function query<T = unknown>(
	sql: string,
	args?: any[],
): Promise<{ rows: T[]; err: null } | { rows: null; err: LibsqlError }> {
	try {
		const res = args ? await db.execute(sql, args) : await db.execute(sql)
		return { rows: res.rows as T[], err: null }
	} catch (err) {
		const libsql_error = err as LibsqlError
		console.error(libsql_error)
		return { rows: null, err: libsql_error }
	}
}
