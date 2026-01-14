<script lang="ts">
	import './app.css'

	let { children } = $props()
</script>

<svelte:head>
	<title>Linque</title>
</svelte:head>

{@render children()}
