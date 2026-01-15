<script lang="ts">
	import { page } from '$app/state'
</script>

<nav>
	<ul>
		{#if page.data.user}
			<li>
				<a href="/links">Links</a>
			</li>
			<li>
				<a href="/account">Account</a>
			</li>
		{:else}
			<li>
				<a href="/">Home</a>
			</li>
			<li>
				<a href="/login">Login</a>
			</li>
			<li>
				<a href="/register">Register</a>
			</li>
		{/if}
	</ul>
</nav>

<style>
	nav {
		padding-block: 1rem;
		background-color: var(--nav-color);
		margin-bottom: 0.5rem;
	}

	ul {
		list-style-type: none;
		display: flex;
		justify-content: center;
		gap: 1rem;
	}
</style>
