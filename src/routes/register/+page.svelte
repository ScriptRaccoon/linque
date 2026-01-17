<script lang="ts">
	import { enhance } from '$app/forms'

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
		<label for="password">Password</label>
		<input type="password" name="password" id="password" required />
	</div>

	<div class="form-actions">
		<button>Submit</button>
	</div>
</form>

{#if form?.error}
	<p class="error">{form.error}</p>
{/if}
