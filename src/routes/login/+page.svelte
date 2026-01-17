<script lang="ts">
	import FormWrapper from '$lib/components/FormWrapper.svelte'

	let { form, data } = $props()
</script>

<svelte:head>
	<title>Linque - Login</title>
</svelte:head>

<header>
	<h1>Login</h1>
</header>

<FormWrapper {form}>
	<div class="form-group">
		<label for="username">Username</label>
		<input type="text" id="username" name="username" required />
	</div>

	<div class="form-group">
		<label for="password">Password</label>
		<input type="password" id="password" name="password" required />
	</div>
</FormWrapper>

{#if !form && data.from_message}
	<p class="message">{data.from_message}</p>
{/if}
