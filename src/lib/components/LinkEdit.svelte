<script lang="ts">
	import { Eye, X } from 'lucide-svelte'
	import { open_dialog } from '$lib/dialog.svelte'

	type Props = {
		id: string
		label: string
		url: string
		click_count: number
	}

	let { id, label, url, click_count }: Props = $props()

	function show_delete_dialog() {
		open_dialog({
			id,
			question: `Do you want to delete the link '${label}'?`,
			action: '/links?/delete',
		})
	}
</script>

<div class="link">
	<h3>{label}</h3>
	<a href={url} class="url">{url}</a>
	<span aria-label="number of clicks" class="clicks">
		<Eye size={18} />
		{click_count}
	</span>

	<button
		aria-label="delete {label}"
		class="accent-button"
		onclick={() => show_delete_dialog()}
	>
		<X />
	</button>
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

		button {
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

	.url {
		font-family: monospace;
		width: fit-content;
	}
</style>
