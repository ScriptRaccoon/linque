<script lang="ts">
	import { page } from '$app/state'
	import { Eye, House, Link2, List, LogIn, User, UserPlus } from 'lucide-svelte'
	import NavLink from './NavLink.svelte'
</script>

<nav>
	<ul>
		{#if page.data.user}
			<li>
				<NavLink path="/links" label="Edit">
					<List size={20} />
				</NavLink>
			</li>
			<li>
				<NavLink path="@{page.data.user?.displayname}" label="Preview">
					<Eye size={20} />
				</NavLink>
			</li>
			<li>
				<NavLink path="/account" label="Account">
					<User size={20} />
				</NavLink>
			</li>
		{:else}
			<li>
				<NavLink path="/" label="Home">
					<House size={20} />
				</NavLink>
			</li>
			<li>
				<NavLink path="/login" label="Login">
					<LogIn size={20} />
				</NavLink>
			</li>
			<li>
				<NavLink path="/register" label="Register">
					<UserPlus size={20} />
				</NavLink>
			</li>
		{/if}
	</ul>
</nav>

<style>
	nav {
		padding-block: 1rem;
		margin-bottom: 0.5rem;
	}

	ul {
		list-style-type: none;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 1rem;
	}
</style>
