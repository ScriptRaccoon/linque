<script lang="ts">
	import { page } from '$app/state'
	import { Eye, House, List, LogIn, User, UserPlus, Wrench } from 'lucide-svelte'
	import NavLink from './NavLink.svelte'
</script>

<nav>
	<ul>
		{#if page.data.user && page.data.user.page_id !== null}
			<li>
				<NavLink path="/links" label="Links">
					<List size={20} />
				</NavLink>
			</li>

			<li>
				<NavLink path="/configure" label="Configure">
					<Wrench size={20} />
				</NavLink>
			</li>

			{#if page.data.displayname}
				<li>
					<NavLink
						path="@{page.data.displayname}?preview=true"
						label="Preview"
						current={page.url.pathname === `/@${page.data.displayname}`}
					>
						<Eye size={20} />
					</NavLink>
				</li>
			{/if}
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
