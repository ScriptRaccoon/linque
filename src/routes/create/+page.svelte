<script lang="ts">
	import FormWrapper from '$lib/components/FormWrapper.svelte'
	import Textarea from '$lib/components/Textarea.svelte'

	let { data, form } = $props()
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
		<Textarea name="bio" content="" max_length={data.max_bio_length} />
	</div>
</FormWrapper>
