<script lang="ts">
	import { enhance } from '$app/forms'

	type Props = {
		id: string
		show_dialog: boolean
	}

	let { id, show_dialog = $bindable() }: Props = $props()

	let dialog_element = $state<HTMLDialogElement | null>(null)

	$effect(() => {
		if (show_dialog) {
			dialog_element?.showModal()
		}
	})
</script>

<dialog bind:this={dialog_element}>
	<div class="question">Do you want to delete this link?</div>

	<form method="POST" action="/links?/delete" use:enhance>
		<input type="hidden" name="id" value={id} />
		<div class="form-actions">
			<button class="danger">Yes</button>
			<button type="button" onclick={() => (show_dialog = false)}> Cancel </button>
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
