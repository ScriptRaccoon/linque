<script lang="ts">
	import { Copy, CopyCheck, List } from 'lucide-svelte'

	type Props = {
		page_url: string
	}

	let { page_url }: Props = $props()

	let copied = $state(false)

	async function copy_page_url() {
		copied = true
		await navigator.clipboard.writeText(page_url)
		setTimeout(() => {
			copied = false
		}, 2000)
	}
</script>

<section aria-label="Preview Bar">
	<span class="preview-title">Preview</span>
	<menu>
		<a href="/links" aria-label="links">
			<List size={20} />
		</a>
		<button aria-label="copy page URL" onclick={copy_page_url}>
			{#if copied}
				<CopyCheck size={20} />
			{:else}
				<Copy size={20} />
			{/if}
		</button>
	</menu>
</section>

<style>
	section {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-block: 1rem;
		border-bottom: 1px solid var(--outline-color);
	}

	.preview-title {
		font-variant: small-caps;
		font-size: 1.25rem;
		color: var(--secondary-font-color);
	}

	menu {
		display: flex;
		justify-content: center;
		gap: 1rem;
	}
</style>
