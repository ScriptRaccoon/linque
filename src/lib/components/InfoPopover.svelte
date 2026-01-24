<script lang="ts">
	import { Info } from 'lucide-svelte'
	import type { Snippet } from 'svelte'

	type Props = {
		label: string
		children: Snippet
	}

	let { label, children }: Props = $props()

	const id = $props.id()
	const button_id = `${id}_button`
</script>

<button popovertarget={id} id={button_id} aria-label={label} type="button">
	<Info size={18} color="var(--secondary-font-color)" />
</button>

<div class="popover" {id} popover>
	{@render children()}
</div>

<style>
	.popover {
		position-area: bottom;
		border: none;
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		margin-inline: 0.5rem;
		color: inherit;
		background-color: var(--secondary-bg-color);
		outline: 1px solid var(--outline-color);
		box-shadow: 0 0 1rem #000a;
		font-size: 0.875rem;
		max-width: 30ch;
	}
</style>
