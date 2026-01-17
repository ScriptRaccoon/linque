<script lang="ts">
	import FormWrapper from '$lib/components/FormWrapper.svelte'

	let { form } = $props()
</script>

<svelte:head>
	<title>Linque - Register</title>
</svelte:head>

<header>
	<h1>Register</h1>
</header>

<FormWrapper {form}>
	<div class="form-group">
		<label for="username">Username</label>
		<input type="text" name="username" id="username" required />
	</div>

	<div class="form-group">
		<label for="password">Password</label>
		<input type="password" name="password" id="password" required />
	</div>
</FormWrapper>
