<script lang="ts">
	import { enhance } from '$app/forms'

	let { form } = $props()
</script>

<h1>Register</h1>

<form method="POST" use:enhance>
	<div class="form-group">
		<label for="username">Username</label>
		<input type="text" name="username" id="username" />
	</div>

	<div class="form-group">
		<label for="displayname">Display name</label>
		<input type="text" name="displayname" id="displayname" />
	</div>

	<div class="form-group">
		<label for="password">Password</label>
		<input type="password" name="password" id="password" />
	</div>

	<div class="form-actions">
		<button>Submit</button>
	</div>
</form>

{#if form?.error}
	<p class="error">{form.error}</p>
{/if}
