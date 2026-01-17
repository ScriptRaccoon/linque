<script lang="ts">
	import { enhance } from '$app/forms'
	import type { Snippet } from 'svelte'

	type Props = {
		children: Snippet
		submit_text?: string
		action?: string
	}

	let { children, submit_text = 'Submit', action = '' }: Props = $props()

	let sending = $state(false)
</script>

<form
	method="POST"
	{action}
	use:enhance={() => {
		sending = true
		return async ({ update }) => {
			await update()
			sending = false
		}
	}}
>
	{@render children()}

	<div class="form-actions">
		<button disabled={sending}>
			{#if sending}
				{submit_text}...
			{:else}
				{submit_text}
			{/if}
		</button>
	</div>
</form>
