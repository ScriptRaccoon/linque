<script lang="ts">
	import { enhance } from '$app/forms'
	import { Info } from 'lucide-svelte'

	let { form } = $props()
</script>

<svelte:head>
	<title>Linque - Register</title>
</svelte:head>

<header>
	<h1>Register</h1>
</header>

<form method="POST" use:enhance>
	<div class="form-group">
		<label for="username">Username</label>
		<input type="text" name="username" id="username" required />
	</div>

	<div class="form-group">
		<label for="displayname">Display name</label>
		<input type="text" name="displayname" id="displayname" required />
	</div>

	<div class="form-group">
		<label for="password">Password</label>
		<input type="password" name="password" id="password" required />
	</div>

	<div class="form-actions">
		<button>Submit</button>
	</div>
</form>

<p class="info">
	<Info size={20} />
	The display name is shown on your link page. The username stays private and is only used for
	logging in.
</p>

{#if form?.error}
	<p class="error">{form.error}</p>
{/if}

<style>
	.info {
		margin-block: 2rem 1rem;
		color: var(--secondary-font-color);
	}
</style>
