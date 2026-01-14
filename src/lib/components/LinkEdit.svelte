<script lang="ts">
	import { enhance } from '$app/forms'
	import { Eye, X } from 'lucide-svelte'

	type Props = {
		id: string
		label: string
		url: string
		click_count: number
	}

	let { id, label, url, click_count }: Props = $props()

	let confirm_deletion = $state(false)

	function handle_delete_click() {
		confirm_deletion = true
		setTimeout(() => {
			confirm_deletion = false
		}, 3000)
	}
</script>

<div class="link">
	<h3>{label}</h3>
	<a href={url} class="url">{url}</a>
	<span aria-label="number of clicks" class="clicks">
		<Eye size={18} />
		{click_count}
	</span>

	<form method="POST" action="?/delete" use:enhance>
		{#if confirm_deletion}
			<input type="hidden" name="id" value={id} />
			<button aria-label="delete {label}" class="accent-button delete-button">
				<X />
			</button>
			<span class="confirm">Confirm deletion</span>
		{:else}
			<button
				aria-label="delete {label}"
				type="button"
				class="accent-button delete-button"
				onclick={handle_delete_click}
			>
				<X />
			</button>
		{/if}
	</form>
</div>

<style>
	.link {
		background-color: var(--secondary-bg-color);
		padding: 0.75rem;
		border-radius: 0.5rem;
		display: grid;
		grid-template-rows: repeat(3, 1fr);
		grid-template-columns: 1fr auto;
		gap: 0.25rem;
		position: relative;

		form {
			grid-column: 2;
			grid-row: 1 / -1;
			align-self: center;
		}
	}

	.clicks {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		font-size: 0.875rem;
		color: var(--secondary-font-color);
	}

	.link:has(.delete-button:is(:focus-visible, :hover)) {
		outline: 2px dashed var(--outline-color);
	}

	.url {
		font-family: monospace;
	}

	.confirm {
		position: absolute;
		bottom: 100%;
		right: 0;
		border-radius: 0.25rem;
		background-color: var(--bg-color);
		padding: 0.1rem 0.5rem;
		outline: 1px solid var(--outline-color);
	}
</style>
