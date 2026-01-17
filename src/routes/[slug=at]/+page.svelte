<script lang="ts">
	import { decode_spaces } from '$lib/utils'

	let { data } = $props()
</script>

<svelte:head>
	<title>Linque by {decode_spaces(data.displayname)}</title>

	<meta property="og:title" content="Lingue by {decode_spaces(data.displayname)}" />

	{#if data.bio}
		<meta property="og:description" content={data.bio} />
		<meta name="description" content={data.bio} />
	{/if}
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://linque.netlify.app/@{data.displayname}" />
	<meta property="og:site_name" content="Linque" />
</svelte:head>

<header>
	<h1>{decode_spaces(data.displayname)}</h1>

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
		background: var(--link-gradient);
		padding: 0.75rem;
		border-radius: 1rem;
		box-shadow:
			0 0 1rem #0006,
			1px 1px 0.5rem #fff2 inset;
	}

	footer {
		text-align: center;
		padding-block: 3rem 2rem;
		color: var(--secondary-font-color);
	}

	.info {
		text-align: center;
	}
</style>
