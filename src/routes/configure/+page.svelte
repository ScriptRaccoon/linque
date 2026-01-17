<script lang="ts">
	import { enhance } from '$app/forms'

	let { form, data } = $props()

	let copied = $state(false)

	async function copy_url() {
		copied = true
		await navigator.clipboard.writeText(data.page_url)
		setTimeout(() => {
			copied = false
		}, 1200)
	}
</script>

<svelte:head>
	<title>Linque - Configure Page</title>
</svelte:head>

<header>
	<h1>Configure Page</h1>

	<button class="button" onclick={copy_url}>
		{#if copied}
			Copied!
		{:else}
			Copy public URL
		{/if}
	</button>
</header>

<section>
	<h2>Display name</h2>

	<form method="POST" action="?/displayname" use:enhance>
		<div class="form-group">
			<label for="displayname">New display name</label>
			<input
				type="text"
				name="displayname"
				id="displayname"
				value={data.displayname}
				required
			/>
		</div>

		<div class="form-actions">
			<button>Submit</button>
		</div>
	</form>

	{#if form?.type === 'displayname'}
		{#if form?.error}
			<p class="error">{form.error}</p>
		{/if}

		{#if form?.message}
			<p class="message">{form.message}</p>
		{/if}
	{/if}
</section>

<section>
	<h2>Bio (optional)</h2>

	<form method="POST" action="?/bio" use:enhance>
		<div class="form-group">
			<label for="bio">Bio</label>
			<textarea name="bio" id="bio">{data.bio ?? ''}</textarea>
		</div>

		<div class="form-actions">
			<button>Submit</button>
		</div>
	</form>

	{#if form?.type === 'bio'}
		{#if form?.error}
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
