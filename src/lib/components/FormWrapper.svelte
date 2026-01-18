<script lang="ts">
	import { enhance } from '$app/forms'
	import type { Snippet } from 'svelte'

	type Props = {
		children: Snippet
		submit_text?: string
		action?: string
		form: { error: string } | { message: string } | null
	}

	let { children, submit_text = 'Submit', action = '', form }: Props = $props()

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

	<div>
		<button class="button" disabled={sending}>
			{#if sending}
				{submit_text}...
			{:else}
				{submit_text}
			{/if}
		</button>
	</div>
</form>

{#if form && !sending}
	{#if 'error' in form}
		<p class="error">{form.error}</p>
	{/if}

	{#if 'message' in form}
		<p class="message">{form.message}</p>
	{/if}
{/if}
