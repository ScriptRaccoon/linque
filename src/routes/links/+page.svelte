<script lang="ts">
	import { invalidateAll } from '$app/navigation'
	import { page } from '$app/state'
	import FormWrapper from '$lib/components/FormWrapper.svelte'
	import LinkEdit from '$lib/components/LinkEdit.svelte'
	import { sleep } from '$lib/utils'
	import { ArrowDownUp } from 'lucide-svelte'
	import { flip } from 'svelte/animate'
	import { cubicOut } from 'svelte/easing'

	let { data, form } = $props()

	let copied = $state(false)

	const FLIP_DURATION = 200

	async function copy_url() {
		const page_url = `${page.url.origin}/@${page.data.displayname}`
		copied = true
		await navigator.clipboard.writeText(page_url)
		setTimeout(() => {
			copied = false
		}, 1200)
	}

	let links = $derived(data.links)

	async function swap_links(i: number) {
		const pos_1 = links[i].position
		const pos_2 = links[i + 1].position

		// optimistic update
		links = [...links.slice(0, i), links[i + 1], links[i], ...links.slice(i + 2)]

		await sleep(FLIP_DURATION)

		try {
			const res = await fetch('/api/links/swap', {
				method: 'PATCH',
				body: JSON.stringify({ pos_1, pos_2 }),
			})
			if (!res.ok) console.error('Failed to swap')
		} catch (err) {
			console.error(err)
		}

		// refetch links from db
		invalidateAll()
	}
</script>

<svelte:head>
	<title>Linque - Links</title>
</svelte:head>

<header>
	<h1>Links</h1>
	<button class="button" onclick={copy_url}>
		{#if copied}
			Copied!
		{:else}
			Copy public URL
		{/if}
	</button>
</header>

<section>
	<h2>Add Link</h2>

	<FormWrapper action="?/add" form={form?.type === 'add' ? form : null}>
		<div class="form-group">
			<label for="label">Label</label>
			<input type="text" name="label" id="label" required />
		</div>

		<div class="form-group">
			<label for="url">URL</label>
			<input type="text" name="url" id="url" required value="https://" />
		</div>
	</FormWrapper>
</section>

<section>
	<h2>Edit Links</h2>

	{#if links.length}
		<div>
			{#each links as link, index (link.id)}
				<div animate:flip={{ duration: FLIP_DURATION, easing: cubicOut }}>
					<LinkEdit {...link} />

					{#if index < links.length - 1}
						{@const next_link = links[index + 1]}
						<div class="swapper">
							<button
								aria-label="swap {link.label} with {next_link.label}"
								class="icon-button"
								onclick={() => swap_links(index)}
							>
								<ArrowDownUp size={20} />
							</button>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{:else}
		<p>No links yet</p>
	{/if}

	{#if form && ['edit', 'delete'].includes(form.type)}
		{#if form.error}
			<p class="error">{form.error}</p>
		{/if}

		{#if form?.message}
			<p class="message">{form.message}</p>
		{/if}
	{/if}
</section>

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.swapper {
		text-align: center;
		margin-block: 0.25rem;
	}
</style>
