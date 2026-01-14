<script lang="ts">
	let { data } = $props()
</script>

<svelte:head>
	<title>Links by {data.name}</title>
</svelte:head>

<h1>Links by {data.name}</h1>

<div class="links">
	{#each data.links as link}
		<a class="link" href={link.url}>
			{link.label}
		</a>
	{/each}
</div>

<style>
	.links {
		display: grid;
		gap: 1rem;
		margin-top: 2rem;
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
</style>
