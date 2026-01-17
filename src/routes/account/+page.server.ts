import { error, fail, redirect, type Actions } from '@sveltejs/kit'
import bcrypt from 'bcrypt'
import { is_constraint_error, query } from '$lib/server/db'
import { delete_auth_cookie } from '$lib/server/auth'
import * as v from 'valibot'
import { password_schema, username_schema } from '$lib/server/schemas'
import type { PageServerLoad } from './$types'
import { displayname_schema } from '$lib/server/schemas'
import { encode_spaces } from '$lib/utils'
import { COOKIE_OPTIONS } from '$lib/server/auth'
import { bio_schema } from '$lib/server/schemas'
import { COOKIE_DISPLAYNAME } from '$lib/server/config'

export const load: PageServerLoad = async (event) => {
	const user = event.locals.user
	if (!user) {
		error(401, 'Unauthorized')
	}

	const sql = `
		SELECT
			username,
			displayname,
			bio
		FROM
			users
		INNER JOIN
			profiles
		ON
			users.id = profiles.user_id
		WHERE users.id = ?`

	const { rows, err } = await query<{
		username: string
		displayname: string
		bio: string
	}>(sql, [user.id])

	if (err || !rows.length) {
		error(500, 'Internal Server Error')
	}

	const { username, displayname, bio } = rows[0]

	return { username, displayname, bio }
}

export const actions: Actions = {
	username: async (event) => {
		const user = event.locals.user
		if (!user) {
			error(401, 'Unauthorized')
		}

		const form = await event.request.formData()
		const username = form.get('username') as string

		const username_parsed = v.safeParse(username_schema, username)

		if (!username_parsed.success) {
			return fail(400, {
				type: 'username',
				error: username_parsed.issues[0].message,
			})
		}

		const { err } = await query('UPDATE users SET username = ? WHERE id = ?', [
			username,
			user.id,
		])

		if (err) {
			if (is_constraint_error(err)) {
				return fail(409, {
					type: 'username',
					error: 'Username is already taken',
				})
			}

			return fail(500, {
				type: 'username',
				error: 'Internal Server Error',
			})
		}

		return {
			type: 'username',
			message: 'Username has been updated',
		}
	},

	password: async (event) => {
		const user = event.locals.user
		if (!user) {
			error(401, 'Unauthorized')
		}

		const form = await event.request.formData()

		const current_password = form.get('current_password') as string
		const new_password = form.get('new_password') as string

		const { rows, err } = await query<{ password_hash: string }>(
			'SELECT password_hash FROM users WHERE id = ?',
			[user.id],
		)

		if (err || !rows.length) {
			return fail(500, {
				type: 'password',
				error: 'Internal Server Error',
			})
		}

		const { password_hash } = rows[0]

		const current_is_correct = await bcrypt.compare(current_password, password_hash)

		if (!current_is_correct) {
			return fail(401, {
				type: 'password',
				error: 'Current password is incorrect',
			})
		}

		const new_password_parsed = v.safeParse(password_schema, new_password)

		if (!new_password_parsed.success) {
			return fail(400, {
				type: 'password',
				error: new_password_parsed.issues[0].message,
			})
		}

		const new_password_hash = await bcrypt.hash(new_password, 10)

		const { err: err_update } = await query(
			'UPDATE users SET password_hash = ? WHERE id = ?',
			[new_password_hash, user.id],
		)

		if (err_update) {
			return fail(500, {
				type: 'password',
				error: 'Internal Server Error',
			})
		}

		return {
			type: 'password',
			message: 'Password has been updated',
		}
	},

	displayname: async (event) => {
		const user = event.locals.user
		if (!user || user.profile_id === null) {
			error(401, 'Unauthorized')
		}

		const form = await event.request.formData()
		const displayname = form.get('displayname') as string

		const displayname_parsed = v.safeParse(displayname_schema, displayname)

		if (!displayname_parsed.success) {
			return fail(400, {
				type: 'displayname',
				error: displayname_parsed.issues[0].message,
			})
		}

		const displayname_db = encode_spaces(displayname)

		const { err } = await query('UPDATE profiles SET displayname = ? WHERE id = ?', [
			displayname_db,
			user.profile_id,
		])

		if (err) {
			if (is_constraint_error(err)) {
				return fail(409, {
					type: 'displayname',
					error: 'Display name is already taken',
				})
			}
			return fail(500, { type: 'displayname', error: 'Internal Server Error' })
		}

		event.cookies.set(COOKIE_DISPLAYNAME, displayname_db, COOKIE_OPTIONS)

		return {
			type: 'displayname',
			message: 'Display name has been updated',
		}
	},

	bio: async (event) => {
		const user = event.locals.user
		if (!user || user.profile_id === null) {
			error(401, 'Unauthorized')
		}

		const form = await event.request.formData()
		const bio = form.get('bio') as string

		const bio_parsed = v.safeParse(bio_schema, bio)

		if (!bio_parsed.success) {
			return fail(400, {
				type: 'bio',
				error: bio_parsed.issues[0].message,
			})
		}

		const { err } = await query('UPDATE profiles SET bio = ? WHERE id = ?', [
			bio,
			user.profile_id,
		])

		if (err) {
			return fail(500, {
				type: 'bio',
				error: 'Internal Server Error',
			})
		}

		return {
			type: 'bio',
			message: 'Bio has been updated',
		}
	},

	delete: async (event) => {
		const user = event.locals.user
		if (!user) {
			return fail(500, {
				type: 'delete',
				error: 'Unauthorized',
			})
		}

		const { err } = await query('DELETE FROM users WHERE id = ?', [user.id])

		if (err) {
			return fail(500, {
				type: 'delete',
				error: 'Internal Server Error',
			})
		}

		delete_auth_cookie(event)

		return redirect(302, '/')
	},
}
