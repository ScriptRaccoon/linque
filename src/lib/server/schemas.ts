import * as v from 'valibot'

export const password_schema = v.pipe(
	v.string('Password must be a string'),
	v.nonEmpty('Password is required'),
	v.minLength(8, 'Password must be at least 8 characters long'),
	v.maxLength(100, 'Password must be at most 100 characters long'),
	v.regex(/\d/, 'Password must contain at least one digit'),
	v.regex(/[A-Za-z]/, 'Password must contain at least one letter'),
)

export const username_schema = v.pipe(
	v.string('Username must be a string'),
	v.nonEmpty('Username is required'),
	v.maxLength(100, 'Username must be at most 100 characters long'),
	v.regex(
		/^[A-Za-z0-9_-]+$/,
		'Username may only contain letters, digits, underscores, and dashes',
	),
)

export const displayname_schema = v.pipe(
	v.string('Display name must be a string'),
	v.nonEmpty('Display name is required'),
	v.maxLength(50, 'Display name must be at most 50 characters long'),
	v.regex(
		/^[A-Za-z0-9 -]+$/,
		'Display name may only contain letters, digits, spaces, and dashes',
	),
)

export const MAX_BIO_LENGTH = 160

export const bio_schema = v.nullable(
	v.pipe(
		v.string('Bio must be a string'),
		v.maxLength(MAX_BIO_LENGTH, `Bio must be at most ${MAX_BIO_LENGTH} characters long`),
	),
)

export const label_schema = v.pipe(
	v.string('Label must be a string'),
	v.nonEmpty('Label is required'),
	v.maxLength(50, 'Label must be at most 50 characters long'),
)

export const url_schema = v.pipe(
	v.string('URL must be a string'),
	v.url('URL must be a valid URL'),
	v.maxLength(1000, 'URL must be at most 1000 characters long'),
)
