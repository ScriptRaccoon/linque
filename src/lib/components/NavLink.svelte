<script lang="ts">
	import { page } from '$app/state'
	import type { Snippet } from 'svelte'

	type Props = {
		path: string
		label: string
		current?: boolean
		children: Snippet
	}

	let { path, label, current, children }: Props = $props()
</script>

<a href={path} aria-current={current === true || page.url.pathname == path}>
	{@render children()}
	<span>{label}</span>
</a>

<style>
	a {
		text-decoration: none;
		display: flex;
		font-size: 0.875rem;
		gap: 0.5rem;
		align-items: center;
		padding: 0.4rem 0.75rem;
		outline: 1px solid var(--outline-color);
		background-color: var(--input-bg-color);
		border-radius: 0.5rem;
		box-shadow: 0 0 0.5rem #fff1;
	}

	a[aria-current='true'] {
		outline: 1px solid var(--light-outline-color);
	}
</style>
