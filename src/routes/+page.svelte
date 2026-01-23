<script lang="ts">
	let { data } = $props()
</script>

<svelte:head>
	<title>Linque</title>
</svelte:head>

<header>
	<h1>Linque</h1>
</header>

{#if data.message}
	<p class="message">{data.message}</p>
{/if}

<main>
	<p>
		<i>Linque</i> is a simple page that shows all of your links in one place.
	</p>

	<p>
		You can add links to social media profiles, personal websites, blogs, portfolios,
		contact pages, or projects. Share your Linque page once, and others can quickly find
		everything you want to point them to.
	</p>

	<p>
		To get started, <a href="/login">log in</a> or
		<a href="/register">create an account</a>.
	</p>
</main>

<style>
	main {
		font-size: 1.125rem;
	}
</style>
