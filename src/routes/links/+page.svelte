<script lang="ts">
	import { enhance } from '$app/forms'
	import LinkEdit from '$lib/components/LinkEdit.svelte'
	import LinkSwapper from '$lib/components/LinkSwapper.svelte'
	import { Link2 } from 'lucide-svelte'
	import { flip } from 'svelte/animate'
	import { cubicOut } from 'svelte/easing'

	let { data, form } = $props()
</script>

<svelte:head>
	<title>Linque - Manage Links</title>
</svelte:head>

<header>
	<h1>Manage Links</h1>

	{#if data.links.length}
		<div class="public-link-container">
			<Link2 size={20} />
			<a href="@{data.displayname}">Public link page</a>
		</div>
	{/if}
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
			<input type="text" name="url" id="url" required />
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
	<h2>Links</h2>

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

	{#if form?.type === 'edit' && form.error}
		<p class="error">{form.error}</p>
	{/if}

	{#if form?.type === 'edit' && form?.message}
		<p class="message">{form.message}</p>
	{/if}
</section>

<style>
	h1 {
		margin-bottom: 0;
	}

	header {
		margin-bottom: 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.25rem;
	}
</style>
