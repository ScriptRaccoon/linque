type DialogState = {
	open: boolean
	question: string
	action: string
	id?: string
}

export const dialog_state = $state<DialogState>({
	open: false,
	question: '',
	action: '',
})

export function open_dialog(state: Omit<DialogState, 'open'>) {
	dialog_state.open = true
	dialog_state.question = state.question
	dialog_state.action = state.action
	if (state.id) dialog_state.id = state.id
}

export function close_dialog() {
	dialog_state.open = false
	delete dialog_state.id
	dialog_state.question = ''
	dialog_state.action = ''
}
