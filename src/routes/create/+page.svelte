<script lang="ts">
	import FormWrapper from '$lib/components/FormWrapper.svelte'

	let { form } = $props()
</script>

<svelte:head>
	<title>Linque - Create Profile</title>
</svelte:head>

<header>
	<h1>Create Profile</h1>
</header>

<FormWrapper submit_text="Create" {form}>
	<div class="form-group">
		<label for="displayname">Display name (required)</label>
		<input type="text" name="displayname" id="displayname" required />
	</div>

	<div class="form-group">
		<label for="bio">Bio (optional)</label>
		<textarea name="bio" id="bio"></textarea>
	</div>
</FormWrapper>
