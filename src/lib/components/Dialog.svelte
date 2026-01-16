<script lang="ts">
	import { enhance } from '$app/forms'
	import { close_dialog, dialog_state } from '$lib/dialog.svelte'

	let dialog_element = $state<HTMLDialogElement | null>(null)

	$effect(() => {
		if (dialog_state.open) {
			dialog_element?.showModal()
		} else {
			dialog_element?.close()
		}
	})
</script>

<dialog bind:this={dialog_element} onclose={close_dialog}>
	<div class="question">
		{dialog_state.question}
	</div>

	<form method="POST" action={dialog_state.action} use:enhance>
		{#if dialog_state.id}
			<input type="hidden" name="id" value={dialog_state.id} />
		{/if}
		<div class="form-actions">
			<button class="danger">Yes</button>
			<button type="button" onclick={close_dialog}>Cancel</button>
		</div>
	</form>
</dialog>

<style>
	dialog {
		color: inherit;
		background-color: var(--bg-color);
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		outline: 1px solid var(--light-outline-color);
		border: none;
		box-shadow: 0 0 1rem #000a;
		width: min(95vw, 40ch);
		padding: 1.25rem;
		border-radius: 1rem;
	}

	dialog::backdrop {
		background-color: #0005;
	}

	.question {
		text-align: center;
		font-size: 1.125rem;
		margin-bottom: 1rem;
	}

	.form-actions {
		justify-content: center;
	}
</style>
