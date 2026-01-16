<script lang="ts">
	let { data } = $props()
</script>

<svelte:head>
	<title>Linque by {data.name}</title>
</svelte:head>

<div class="page">
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
</div>

<style>
	.page {
		min-height: 100dvh;
		display: grid;
		grid-template-rows: auto auto 1fr;
	}

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
		padding-block: 2rem;
		align-self: end;
	}

	.info {
		text-align: center;
	}
</style>
