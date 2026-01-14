<script lang="ts">
	import { enhance } from '$app/forms'
	import { ArrowDownUp, Link2, X } from 'lucide-svelte'
	import { flip } from 'svelte/animate'
	import { cubicOut } from 'svelte/easing'

	let { data, form } = $props()
</script>

<svelte:head>
	<title>Linque - Manage Links</title>
</svelte:head>

<h1>Manage Links</h1>

{#if data.links.length}
	<div class="public-link-container">
		<Link2 size={20} />
		<a href="@{data.displayname}">Public link page</a>
	</div>
{/if}

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
		<div class="links">
			{#each data.links as link, index (link.id)}
				<div animate:flip={{ duration: 200, easing: cubicOut }}>
					<div class="link">
						<div>
							<h3>{link.label}</h3>
							<a href={link.url} class="url">{link.url}</a>
						</div>
						<form method="POST" action="?/delete" use:enhance>
							<input type="hidden" name="id" value={link.id} />
							<button
								aria-label="delete {link.label}"
								class="accent-button delete-button"
							>
								<X />
							</button>
						</form>
					</div>

					{#if index < data.links.length - 1}
						{@const next_link = data.links[index + 1]}
						<form method="POST" action="?/swap" use:enhance class="swap-form">
							<input type="hidden" name="position_a" value={link.position} />
							<input type="hidden" name="position_b" value={next_link.position} />
							<button
								aria-label="swap {link.label} with {next_link.label}"
								class="accent-button"
							>
								<ArrowDownUp size={20} />
							</button>
						</form>
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
	.public-link-container {
		margin-top: -0.6rem;
		margin-bottom: 1.5rem;
	}

	.link {
		background-color: var(--secondary-bg-color);
		padding: 0.75rem;
		border-radius: 0.5rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.25rem;
		overflow: hidden;
	}

	.link:has(.delete-button:is(:focus-visible, :hover)) {
		outline: 2px dashed var(--outline-color);
	}

	.url {
		font-family: monospace;
	}

	.swap-form {
		text-align: center;
		margin-block: 0.25rem;
	}
</style>
