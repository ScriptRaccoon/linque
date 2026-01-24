<script lang="ts">
	import { Eye, EyeClosed, Globe, X } from 'lucide-svelte'
	import { open_dialog } from '$lib/dialog.svelte'
	import { enhance } from '$app/forms'

	type Props = {
		id: string
		label: string
		url: string
		click_count: number
		is_public: 0 | 1
	}

	let { id, label, url, click_count, is_public }: Props = $props()

	function show_delete_dialog() {
		open_dialog({
			id,
			question: `Do you want to delete the link '${label}'?`,
			action: '/links?/delete',
		})
	}
</script>

<div class="link">
	<div class="content">
		<h3>{label}</h3>

		<a href={url} class="url">{url}</a>

		<span aria-label="number of clicks" class="clicks">
			<Eye size={18} />
			{click_count}
		</span>
	</div>

	<div class="actions">
		<form method="POST" action={is_public ? '?/unpublish' : '?/publish'} use:enhance>
			<input type="hidden" name="id" value={id} />
			<button
				aria-label={is_public ? `unpublish ${label}` : `publish ${label}`}
				class="icon-button"
			>
				{#if is_public}
					<Globe size={20} />
				{:else}
					<EyeClosed size={20} />
				{/if}
			</button>
		</form>

		<button
			aria-label="delete {label}"
			class="icon-button"
			onclick={() => show_delete_dialog()}
		>
			<X />
		</button>
	</div>
</div>

<style>
	.link {
		background-color: var(--secondary-bg-color);
		padding: 0.75rem;
		border-radius: 0.5rem;
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 0.5rem;
		box-shadow: 0 0 1rem #0006;
	}

	.link .content {
		display: grid;
		gap: 0.5rem;
		overflow: hidden;
	}

	.url {
		font-family: monospace;
		width: fit-content;
	}

	.clicks {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		font-size: 0.875rem;
		color: var(--secondary-font-color);
	}

	.link .actions {
		display: flex;
	}
</style>
