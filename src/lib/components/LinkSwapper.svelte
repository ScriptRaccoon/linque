<script lang="ts">
	import { enhance } from '$app/forms'
	import type { LinkItem } from '$lib/types'
	import { ArrowDownUp } from 'lucide-svelte'

	type Props = {
		link: LinkItem
		next_link: LinkItem
	}

	let { link, next_link }: Props = $props()
</script>

<form method="POST" action="?/swap" use:enhance class="swap-form">
	<input type="hidden" name="position_a" value={link.position} />
	<input type="hidden" name="position_b" value={next_link.position} />
	<button aria-label="swap {link.label} with {next_link.label}" class="accent-button">
		<ArrowDownUp size={20} />
	</button>
</form>

<style>
	.swap-form {
		text-align: center;
		margin-block: 0.25rem;
	}
</style>
