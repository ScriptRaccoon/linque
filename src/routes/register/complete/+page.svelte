<script lang="ts">
	import { enhance } from '$app/forms'

	let { data, form } = $props()
</script>

<svelte:head>
	<title>Linque - Complete Registration</title>
</svelte:head>

<header>
	<h1>Complete Registration</h1>
</header>

<p>Display name and bio (optional) will be shown on your public link page.</p>

<form method="POST" use:enhance>
	<div class="form-group">
		<label for="displayname">Display name (required)</label>
		<input
			type="text"
			name="displayname"
			id="displayname"
			required
			value={data.user?.displayname}
		/>
	</div>

	<div class="form-group">
		<label for="bio">Bio (optional)</label>
		<textarea name="bio" id="bio"></textarea>
	</div>

	<div class="form-actions">
		<button formaction="?/complete">Submit</button>
		<button class="danger" formaction="?/cancel">Cancel</button>
	</div>
</form>

{#if form?.error}
	<p class="error">{form.error}</p>
{/if}

<style>
	.form-actions {
		justify-content: space-between;
		flex-direction: row-reverse;
	}
</style>
