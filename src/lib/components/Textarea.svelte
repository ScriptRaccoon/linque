<script lang="ts">
	type Props = {
		name: string
		content: string
		max_length: number
	}

	let { name, content, max_length }: Props = $props()

	let live_content = $derived(content)

	let length = $derived(live_content.length)
</script>

<textarea {name} id={name} bind:value={live_content} class:invalid={length > max_length}
></textarea>

<div class="indicator">{length}/{max_length}</div>

<style>
	.indicator {
		margin-top: -2px;
		font-size: 0.75rem;
		color: var(--secondary-font-color);
		font-family: monospace;
	}

	textarea.invalid {
		outline-color: var(--error-color);
	}
</style>
