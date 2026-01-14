<script lang="ts">
	import Nav from '$lib/components/Nav.svelte'

	let { children } = $props()
</script>

<Nav />

<div class="container">
	{@render children()}
</div>
