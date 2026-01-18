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

	let sending = $state(false)
</script>

<dialog bind:this={dialog_element} onclose={close_dialog}>
	<div class="question">
		{dialog_state.question}
	</div>

	<form
		method="POST"
		action={dialog_state.action}
		use:enhance={() => {
			sending = true
			return async ({ update }) => {
				await update()
				sending = false
				close_dialog()
			}
		}}
	>
		{#if dialog_state.id}
			<input type="hidden" name="id" value={dialog_state.id} />
		{/if}
		<div class="actions">
			<button class="button" type="button" onclick={close_dialog} disabled={sending}>
				Cancel
			</button>

			<button class="button danger" disabled={sending}>
				{#if sending}
					Yes...
				{:else}
					Yes
				{/if}
			</button>
		</div>
	</form>
</dialog>

<style>
	dialog {
		color: inherit;
		background-color: var(--bg-color);
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border: 1px solid var(--light-outline-color);
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

	.actions {
		display: flex;
		justify-content: center;
		gap: 1rem;
	}
</style>
