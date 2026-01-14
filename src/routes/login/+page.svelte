<script lang="ts">
	import { enhance } from '$app/forms'

	let { form, data } = $props()
</script>

<h1>Login</h1>

<form method="POST" use:enhance>
	<div class="form-group">
		<label for="username">Username</label>
		<input type="text" id="username" name="username" />
	</div>

	<div class="form-group">
		<label for="password">Password</label>
		<input type="password" id="password" name="password" />
	</div>

	<div class="form-actions">
		<button>Submit</button>
	</div>
</form>

{#if form?.error}
	<p class="error">{form.error}</p>
{:else if data.message}
	<p class="message">{data.message}</p>
{/if}
