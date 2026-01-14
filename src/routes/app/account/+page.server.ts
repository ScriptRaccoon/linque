import { error, fail, redirect, type Actions } from '@sveltejs/kit'
import bcrypt from 'bcrypt'
import { query } from '$lib/server/db'
import type { PageServerLoad } from '../$types'
import { MINIMAL_PASSWORD_LENGTH } from '$lib/server/config'
import { delete_auth_cookie } from '$lib/server/auth'

export const load: PageServerLoad = async (event) => {
	const user = event.locals.user
	if (!user) {
		error(401, 'Unauthorized')
	}

	const { rows, err } = await query<{ username: string }>(
		'SELECT username FROM users WHERE id = ?',
		[user.id],
	)

	if (err || !rows.length) {
		error(500, 'Internal Server Error')
	}

	const username = rows[0].username

	return { username }
}

export const actions: Actions = {
	username: async (event) => {
		const user = event.locals.user
		if (!user) {
			error(401, 'Unauthorized')
		}

		const form = await event.request.formData()
		const username = form.get('username') as string

		if (!username.length) {
			return fail(400, {
				type: 'username',
				error: 'Username required',
			})
		}

		const { err } = await query('UPDATE users SET username = ? WHERE id = ?', [
			username,
			user.id,
		])

		if (err) {
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

		if (new_password.length < MINIMAL_PASSWORD_LENGTH) {
			return fail(400, {
				type: 'password',
				error: `New password must be at least ${MINIMAL_PASSWORD_LENGTH} characters`,
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
			return fail(500, { error: 'Internal Server Error' })
		}

		delete_auth_cookie(event)

		return redirect(302, '/')
	},
}
