<script lang="ts">
	import FormWrapper from '$lib/components/FormWrapper.svelte'
	import InfoPopover from '$lib/components/InfoPopover.svelte'
	import Textarea from '$lib/components/Textarea.svelte'

	let { data, form } = $props()
</script>

<svelte:head>
	<title>Linque - Create Profile</title>
</svelte:head>

<header>
	<h1>Create Profile</h1>
</header>

<FormWrapper submit_text="Create" submitting_text="Creating..." {form}>
	<div class="form-group">
		<div class="label-with-info">
			<label for="displayname">Display name (required)</label>
			<InfoPopover label="infos about the display name">
				The display name is shown on the public link page. It is not used for logging in.
			</InfoPopover>
		</div>
		<input type="text" name="displayname" id="displayname" required />
	</div>

	<div class="form-group">
		<div class="label-with-info">
			<label for="bio">Bio (optional)</label>
			<InfoPopover label="infos about bio">
				The bio is a short summary about yourself. It is shown on the public link page.
			</InfoPopover>
		</div>
		<Textarea name="bio" content="" max_length={data.max_bio_length} />
	</div>
</FormWrapper>
