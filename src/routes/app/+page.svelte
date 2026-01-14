<script lang="ts">
	import { enhance } from '$app/forms'

	let { data, form } = $props()
</script>

<h1>Manage links</h1>

<p>
	<a href="/list/{data.displayname}">Preview your public link list</a>
</p>

<section>
	<h2>Add Link</h2>

	<form method="POST" action="?/add" use:enhance>
		<div class="form-group">
			<label for="label">Label</label>
			<input type="text" name="label" id="label" />
		</div>

		<div class="form-group">
			<label for="url">URL</label>
			<input type="text" name="url" id="url" />
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
					<div class="form-actions">
						<button>Delete</button>
					</div>
				</form>
			</div>

			{#if index < data.links.length - 1}
				{@const next_link = data.links[index + 1]}
				<form method="POST" action="?/swap" use:enhance class="swap-form">
					<input type="hidden" name="position_a" value={link.position} />
					<input type="hidden" name="position_b" value={next_link.position} />
					<button>swap</button>
				</form>
			{/if}
		{/each}
	</div>

	{#if form?.type === 'edit' && form.error}
		<p class="error">{form.error}</p>
	{/if}

	{#if form?.type === 'edit' && form?.message}
		<p class="message">{form.message}</p>
	{/if}
</section>

<style>
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
