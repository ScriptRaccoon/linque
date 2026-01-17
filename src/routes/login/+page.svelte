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

<FormWrapper>
	<div class="form-group">
		<label for="username">Username</label>
		<input type="text" id="username" name="username" required />
	</div>

	<div class="form-group">
		<label for="password">Password</label>
		<input type="password" id="password" name="password" required />
	</div>
</FormWrapper>

{#if form?.error}
	<p class="error">{form.error}</p>
{:else if data.message}
	<p class="message">{data.message}</p>
{/if}
