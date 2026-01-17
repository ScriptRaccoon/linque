<script lang="ts">
	import { enhance } from '$app/forms'

	let { form } = $props()
</script>

<svelte:head>
	<title>Linque - Create Linque</title>
</svelte:head>

<header>
	<h1>Create Linque</h1>
</header>

<form method="POST" use:enhance>
	<div class="form-group">
		<label for="displayname">Display name (required)</label>
		<input type="text" name="displayname" id="displayname" required />
	</div>

	<div class="form-group">
		<label for="bio">Bio (optional)</label>
		<textarea name="bio" id="bio"></textarea>
	</div>

	<div class="form-actions">
		<button>Create</button>
	</div>
</form>

{#if form?.error}
	<p class="error">{form.error}</p>
{/if}
