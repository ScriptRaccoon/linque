export function encode_spaces(displayname: string) {
	return displayname.replaceAll(' ', '_')
}

export function decode_spaces(displayname: string) {
	return displayname.replaceAll('_', ' ')
}
