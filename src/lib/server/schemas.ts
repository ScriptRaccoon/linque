import * as v from 'valibot'

export const password_schema = v.pipe(
	v.string('Password must be a string'),
	v.nonEmpty('Password required'),
	v.minLength(8, 'Password must be at least 8 characters'),
	v.maxLength(100, 'Password must be at most 100 characters'),
	v.regex(/\d/, 'Password must contain a digit'),
	v.regex(/[A-Za-z]/, 'Password must contain a letter'),
)

export const username_schema = v.pipe(
	v.string('Username must be a string'),
	v.nonEmpty('Username required'),
	v.maxLength(100, 'Username must be at most 100 characters'),
	v.regex(
		/^[A-Za-z0-9_-]+$/,
		'Username can only have letters, digits, underscores, and dashes',
	),
)

export const displayname_schema = v.pipe(
	v.string('Display name must be a string'),
	v.nonEmpty('Display name required'),
	v.maxLength(50, 'Display name must be at most 50 characters'),
	v.regex(
		/^[A-Za-z0-9 -]+$/,
		'Display name can only have letters, digits, spaces, and dashes',
	),
)

export const bio_schema = v.nullable(
	v.pipe(
		v.string('Bio must be a string'),
		v.maxLength(160, 'Bio must be at most 160 characters'),
	),
)

export const label_schema = v.pipe(
	v.string('Label must be a string'),
	v.nonEmpty('Label required'),
	v.maxLength(50, 'Label must be at most 50 characters'),
)

export const url_schema = v.pipe(
	v.string('URL must be a string'),
	v.url('Invalid URL'),
	v.maxLength(1000, 'URL must be at most 1000 characters'),
)
