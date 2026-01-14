<script lang="ts">
	import { enhance } from '$app/forms'
	import { ArrowDownUp, Link2, X } from 'lucide-svelte'

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
				<div class="link">
					<div>
						<h3>{link.label}</h3>
						<span class="url">
							{link.url}
						</span>
					</div>
					<form method="POST" action="?/delete" use:enhance>
						<input type="hidden" name="id" value={link.id} />
						<button aria-label="Delete">
							<X />
						</button>
					</form>
				</div>

				{#if index < data.links.length - 1}
					{@const next_link = data.links[index + 1]}
					<form method="POST" action="?/swap" use:enhance class="swap-form">
						<input type="hidden" name="position_a" value={link.position} />
						<input type="hidden" name="position_b" value={next_link.position} />
						<button aria-label="swap">
							<ArrowDownUp size={20} />
						</button>
					</form>
				{/if}
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

	.links {
		display: grid;
		gap: 0.5rem;
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

	.url {
		font-family: monospace;
	}

	.swap-form {
		text-align: center;
	}
</style>
