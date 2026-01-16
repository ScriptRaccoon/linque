<script lang="ts">
	import { page } from '$app/state'
	import Dialog from '$lib/components/Dialog.svelte'
	import Nav from '$lib/components/Nav.svelte'
	import './app.css'

	let { children } = $props()
</script>

<svelte:head>
	<title>Linque</title>
</svelte:head>

{#if !page.data.linkpage}
	<Nav />
{/if}

<div class="container" class:mb-2={!page.data.linkpage}>
	{@render children()}
</div>

<Dialog />
