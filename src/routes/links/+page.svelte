<script lang="ts">
	import { enhance } from '$app/forms'
	import { page } from '$app/state'
	import LinkEdit from '$lib/components/LinkEdit.svelte'
	import LinkSwapper from '$lib/components/LinkSwapper.svelte'
	import { flip } from 'svelte/animate'
	import { cubicOut } from 'svelte/easing'

	let { data, form } = $props()

	let copied = $state(false)

	async function copy_url() {
		const page_url = `${page.url.origin}/@${page.data.displayname}`
		copied = true
		await navigator.clipboard.writeText(page_url)
		setTimeout(() => {
			copied = false
		}, 1200)
	}
</script>

<svelte:head>
	<title>Linque - Links</title>
</svelte:head>

<header>
	<h1>Links</h1>
	<button class="button" onclick={copy_url}>
		{#if copied}
			Copied!
		{:else}
			Copy public URL
		{/if}
	</button>
</header>

<section>
	<h2>Add Link</h2>

	<form method="POST" action="?/add" use:enhance>
		<div class="form-group">
			<label for="label">Label</label>
			<input type="text" name="label" id="label" required />
		</div>

		<div class="form-group">
			<label for="url">URL</label>
			<input type="text" name="url" id="url" required value="https://" />
		</div>

		<div class="form-actions">
			<button>Submit</button>
		</div>
	</form>

	{#if form?.type === 'add' && form.error}
		<p class="error">{form.error}</p>
	{/if}

	{#if form?.type === 'add' && form?.message}
		<p class="message">{form.message}</p>
	{/if}
</section>

<section>
	<h2>Edit Links</h2>

	{#if data.links.length}
		<div>
			{#each data.links as link, index (link.id)}
				<div animate:flip={{ duration: 200, easing: cubicOut }}>
					<LinkEdit {...link} />

					{#if index < data.links.length - 1}
						{@const next_link = data.links[index + 1]}
						<LinkSwapper {link} {next_link} />
					{/if}
				</div>
			{/each}
		</div>
	{:else}
		<p>No links yet</p>
	{/if}

	{#if form && ['edit', 'delete'].includes(form.type)}
		{#if form.error}
			<p class="error">{form.error}</p>
		{/if}

		{#if form?.message}
			<p class="message">{form.message}</p>
		{/if}
	{/if}
</section>

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
