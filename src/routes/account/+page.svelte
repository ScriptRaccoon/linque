<script lang="ts">
	import FormWrapper from '$lib/components/FormWrapper.svelte'
	import Textarea from '$lib/components/Textarea.svelte'
	import { open_dialog } from '$lib/dialog.svelte'
	import { decode_spaces } from '$lib/utils'

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
	<a href="/logout" class="button" data-sveltekit-preload-data="off">Logout</a>
</header>

<section>
	<h2>Username</h2>

	<FormWrapper
		submit_text="Update"
		submitting_text="Updating..."
		action="?/username"
		form={form?.type === 'username' ? form : null}
	>
		<div class="form-group">
			<label for="username">Username for login</label>
			<input type="text" name="username" id="username" value={data.username} required />
		</div>
	</FormWrapper>
</section>

<section>
	<h2>Password</h2>

	<FormWrapper
		submit_text="Update"
		submitting_text="Updating..."
		action="?/password"
		form={form?.type === 'password' ? form : null}
	>
		<div class="form-group">
			<label for="current_password">Current password</label>
			<input type="password" name="current_password" id="current_password" required />
		</div>

		<div class="form-group">
			<label for="new_password">New password</label>
			<input type="password" name="new_password" id="new_password" required />
		</div>
	</FormWrapper>
</section>

<section>
	<h2>Display name</h2>

	<FormWrapper
		submit_text="Update"
		submitting_text="Updating..."
		action="?/displayname"
		form={form?.type === 'displayname' ? form : null}
	>
		<div class="form-group">
			<label for="displayname">Name shown on link page</label>
			<input
				type="text"
				name="displayname"
				id="displayname"
				value={decode_spaces(data.displayname)}
				required
			/>
		</div>
	</FormWrapper>
</section>

<section>
	<h2>Bio</h2>

	<FormWrapper
		submit_text="Update"
		submitting_text="Updating..."
		action="?/bio"
		form={form?.type === 'bio' ? form : null}
	>
		<div class="form-group">
			<label for="bio">Bio shown on link page</label>
			<Textarea name="bio" content={data.bio ?? ''} max_length={data.max_bio_length}
			></Textarea>
		</div>
	</FormWrapper>
</section>

<section>
	<h2>Delete account</h2>

	<div>
		<button class="button danger" onclick={open_delete_account_dialog}>Delete</button>
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
