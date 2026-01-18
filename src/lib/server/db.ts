import { DB_AUTH_TOKEN, DB_URL } from '$env/static/private'
import { createClient, type LibsqlError } from '@libsql/client'

export const db = createClient({
	authToken: DB_AUTH_TOKEN,
	url: DB_URL,
})

export async function initialize_db() {
	try {
		await db.executeMultiple('PRAGMA foreign_keys = ON; PRAGMA journal_mode = WAL;')
		console.info('Database initialized ✅')
	} catch (err) {
		console.error((err as LibsqlError).message)
	}
}

export async function query<T = unknown>(
	sql: string,
	args?: any[],
): Promise<{ rows: T[]; err: null } | { rows: null; err: LibsqlError }> {
	try {
		const res = args ? await db.execute(sql, args) : await db.execute(sql)
		return { rows: res.rows as T[], err: null }
	} catch (err) {
		const libsql_error = err as LibsqlError
		if (!is_constraint_error(libsql_error)) console.error(libsql_error)
		return { rows: null, err: libsql_error }
	}
}

/**
 * Locally, the error code for uniqueness constraints is
 * SQLITE_CONSTRAINT_UNIQUE, but on Turso, the error code
 * is just SQLITE_CONSTRAINT - for all constraints.
 */
export function is_constraint_error(err: LibsqlError) {
	return err.code.startsWith('SQLITE_CONSTRAINT')
}
