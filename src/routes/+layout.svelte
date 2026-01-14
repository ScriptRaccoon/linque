<script lang="ts">
	import Nav from '$lib/components/Nav.svelte'
	import './app.css'

	let { children } = $props()
</script>

<svelte:head>
	<title>Linque</title>
</svelte:head>

<Nav />

<div class="container">
	{@render children()}
</div>

<style>
	.container {
		max-width: 600px;
		margin-inline: auto;
		padding-inline: 1rem;
	}
</style>
