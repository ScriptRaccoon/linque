<script lang="ts">
	import PreviewBar from './PreviewBar.svelte'

	let { data } = $props()
</script>

<svelte:head>
	<title>Linque by {data.displayname}</title>
</svelte:head>

{#if data.is_preview}
	<PreviewBar page_url={data.page_url} />
{/if}

<header>
	<h1>{data.displayname}</h1>

	{#if data.bio}
		<div class="bio">{data.bio}</div>
	{/if}
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
		text-align: center;
	}

	.bio {
		color: var(--secondary-font-color);
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
</style>
