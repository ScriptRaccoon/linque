export function encode_spaces(displayname: string) {
	return displayname.replaceAll(' ', '_')
}

export function decode_spaces(displayname: string) {
	return displayname.replaceAll('_', ' ')
}

export const sleep = (ms: number) => new Promise<void>((res) => setTimeout(res, ms))
