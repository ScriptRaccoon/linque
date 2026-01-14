<script lang="ts">
	import { enhance } from '$app/forms'

	let { data, form } = $props()

	let confirm_deletion = $state(false)

	function handle_confirm_click() {
		confirm_deletion = true
	}
</script>

<svelte:head>
	<title>Linque - Account</title>
</svelte:head>

<h1>Account</h1>

<section>
	<h2>Username</h2>

	<p>Your username is used for logging in.</p>

	<form method="POST" action="?/username" use:enhance>
		<div class="form-group">
			<label for="username">New username</label>
			<input type="text" name="username" id="username" value={data.username} />
		</div>

		<div class="form-actions">
			<button>Submit</button>
		</div>
	</form>

	{#if form?.error && form.type === 'username'}
		<p class="error">{form.error}</p>
	{/if}

	{#if form?.message && form.type === 'username'}
		<p class="message">{form.message}</p>
	{/if}
</section>

<section>
	<h2>Display name</h2>

	<p>Your display name is shown on your link page.</p>

	<form method="POST" action="?/displayname" use:enhance>
		<div class="form-group">
			<label for="displayname">New display name</label>
			<input type="text" name="displayname" id="displayname" value={data.displayname} />
		</div>

		<div class="form-actions">
			<button>Submit</button>
		</div>
	</form>

	{#if form?.error && form.type === 'displayname'}
		<p class="error">{form.error}</p>
	{/if}

	{#if form?.message && form.type === 'displayname'}
		<p class="message">{form.message}</p>
	{/if}
</section>

<section>
	<h2>Password</h2>

	<form method="POST" action="?/password" use:enhance>
		<div class="form-group">
			<label for="current_password">Current password</label>
			<input type="password" name="current_password" id="current_password" />
		</div>

		<div class="form-group">
			<label for="new_password">New password</label>
			<input type="password" name="new_password" id="new_password" />
		</div>

		<div class="form-actions">
			<button>Submit</button>
		</div>
	</form>

	{#if form?.error && form.type === 'password'}
		<p class="error">{form.error}</p>
	{/if}

	{#if form?.message && form.type === 'password'}
		<p class="message">{form.message}</p>
	{/if}
</section>

<section>
	<h2>Delete account</h2>

	{#if confirm_deletion}
		<p>All your data will be lost. This action cannot be undone.</p>

		<form method="POST" action="?/delete" use:enhance>
			<div class="form-actions">
				<button class="danger">Confirm deletion</button>
			</div>
		</form>
	{:else}
		<div class="form-actions">
			<button class="danger" onclick={handle_confirm_click}>Delete</button>
		</div>
	{/if}

	{#if form?.error && form.type === 'delete'}
		<p class="error">{form.error}</p>
	{/if}
</section>
