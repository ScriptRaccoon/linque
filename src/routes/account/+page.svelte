<script lang="ts">
	import { enhance } from '$app/forms'
	import { open_dialog } from '$lib/dialog.svelte.js'

	let { data, form } = $props()

	function open_delete_account_dialog() {
		open_dialog({
			question: 'Do you want to delete your account? All data will be permanently lost.',
			action: '/account?/delete',
		})
	}
</script>

<svelte:head>
	<title>Linque - Account</title>
</svelte:head>

<header>
	<h1>Account</h1>
	<a href="/logout" data-sveltekit-preload-data="off">Logout</a>
</header>

<section>
	<h2>Display name</h2>

	<p>Your display name is shown on your link page.</p>

	<form method="POST" action="?/displayname" use:enhance>
		<div class="form-group">
			<label for="displayname">New display name</label>
			<input
				type="text"
				name="displayname"
				id="displayname"
				value={data.user?.displayname}
				required
			/>
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
	<h2>Bio</h2>

	<p>Your bio (optional) is shown on your link page.</p>

	<form method="POST" action="?/bio" use:enhance>
		<div class="form-group">
			<label for="bio">Bio</label>
			<textarea name="bio" id="bio">{data.bio ?? ''}</textarea>
		</div>

		<div class="form-actions">
			<button>Submit</button>
		</div>
	</form>

	{#if form?.error && form.type === 'bio'}
		<p class="error">{form.error}</p>
	{/if}

	{#if form?.message && form.type === 'bio'}
		<p class="message">{form.message}</p>
	{/if}
</section>

<section>
	<h2>Username</h2>

	<p>Your username is used for logging in.</p>

	<form method="POST" action="?/username" use:enhance>
		<div class="form-group">
			<label for="username">New username</label>
			<input
				type="text"
				name="username"
				id="username"
				value={data.user?.username}
				required
			/>
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
	<h2>Password</h2>

	<form method="POST" action="?/password" use:enhance>
		<div class="form-group">
			<label for="current_password">Current password</label>
			<input type="password" name="current_password" id="current_password" required />
		</div>

		<div class="form-group">
			<label for="new_password">New password</label>
			<input type="password" name="new_password" id="new_password" required />
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

	<div class="form-actions">
		<button class="danger" onclick={open_delete_account_dialog}>Delete</button>
	</div>

	{#if form?.error && form.type === 'delete'}
		<p class="error">{form.error}</p>
	{/if}
</section>

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
