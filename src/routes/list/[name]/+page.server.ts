import { query } from '$lib/server/db'
import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async (event) => {
	const name = event.params.name

	const sql = `
    SELECT
        l.url,
        l.label
    FROM
        users u
    INNER JOIN
        links l
    ON
        l.user_id = u.id
    WHERE
        u.displayname = ?
    ORDER BY
        l.created_at
    `

	const { rows: links, err } = await query<{ url: string; label: string }>(sql, [name])

	if (err) {
		error(500, 'Internal Server Error')
	}

	if (!links.length) {
		error(404, 'Not Found')
	}

	return { links, name }
}
