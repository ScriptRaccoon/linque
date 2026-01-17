<script lang="ts">
	import { navigating, page } from '$app/state'
	import Dialog from '$lib/components/Dialog.svelte'
	import LoadingBar from '$lib/components/LoadingBar.svelte'
	import Nav from '$lib/components/Nav.svelte'
	import './app.css'

	let { children } = $props()
</script>

<svelte:head>
	<title>Linque</title>

	<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
	<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
	<link rel="shortcut icon" href="/favicon.ico" />
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<meta name="apple-mobile-web-app-title" content="Linque" />
	<link rel="manifest" href="/site.webmanifest" />

	<meta property="og:title" content="Lingue" />
	<meta
		property="og:description"
		content="Linque is a simple page that shows all of your links in one place."
	/>
	<meta
		name="description"
		content="Linque is a simple page that shows all of your links in one place."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://linque.netlify.app" />
	<meta property="og:site_name" content="Linque" />
</svelte:head>

{#if !page.data.is_linkpage}
	<Nav />
{/if}

<div class="container">
	{@render children()}
</div>

<Dialog />

{#if navigating.to}
	<LoadingBar />
{/if}

<style>
	.container {
		max-width: 600px;
		margin-inline: auto;
		padding-inline: 1rem;
		margin-bottom: 2rem;
	}
</style>
