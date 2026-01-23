<script lang="ts">
	import { ArrowDownUp } from 'lucide-svelte'

	type Props = {
		swap: () => void
		label: string
	}

	let { swap, label }: Props = $props()
</script>

<div class="swapper">
	<button aria-label={label} class="icon-button" onclick={swap}>
		<ArrowDownUp size={20} />
	</button>
</div>

<style>
	.swapper {
		text-align: center;
		margin-block: 0.25rem;
	}
</style>
