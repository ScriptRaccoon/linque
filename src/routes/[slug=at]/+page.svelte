<script lang="ts">
	import { Copy, CopyCheck, List } from 'lucide-svelte'

	let { data } = $props()

	let copied = $state(false)

	async function copy_page_url() {
		copied = true
		await navigator.clipboard.writeText(data.page_url)
		setTimeout(() => {
			copied = false
		}, 2000)
	}
</script>

<svelte:head>
	<title>Linque by {data.name}</title>
</svelte:head>

{#if data.is_preview}
	<menu>
		<a href="/links" class="edit-link" aria-label="edit">
			<List />
		</a>
		<button aria-label="copy page URL" onclick={copy_page_url}>
			{#if copied}
				<CopyCheck />
			{:else}
				<Copy />
			{/if}
		</button>
	</menu>
{/if}

<header>
	<h1>Linque by {data.name}</h1>
</header>

{#if data.links.length}
	<main class="links">
		{#each data.links as link (link.id)}
			<a href="/go/{link.id}?token={data.token}" class="link">
				{link.label}
			</a>
		{/each}
	</main>
{:else}
	<p class="info">No links yet</p>
{/if}

<footer>
	<a href="/">Create your own linque</a>
</footer>

<style>
	header {
		padding-block: 1.25rem;
	}

	h1 {
		text-align: center;
	}

	.links {
		display: grid;
		gap: 1rem;
	}

	.link {
		text-align: center;
		text-decoration: none;
		font-size: 1.5rem;
		background-color: var(--secondary-bg-color);
		padding: 0.75rem;
		border-radius: 0.5rem;
		overflow: hidden;
	}

	footer {
		text-align: center;
		padding-block: 3rem 2rem;
	}

	.info {
		text-align: center;
	}

	menu {
		display: flex;
		justify-content: center;
		gap: 1rem;
		padding-block: 1rem;
		border-bottom: 1px solid var(--outline-color);
	}
</style>
