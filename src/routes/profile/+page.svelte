<script lang="ts">
	import { goto } from '$app/navigation';
	import { root } from '$lib/env.js';
	import type { ProfileUser } from '$lib/types.js';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { up } from 'up-fetch';

	export let data;
	const unsavedChanges = writable(false);

	let newUserData = {} as Partial<ProfileUser>;

	const user = data.user;
	let profileUser: ProfileUser | null = null;
	const showCustomCss = writable(true);

	let editing = [] as ('username' | 'biography' | 'customCss' | 'avatar')[];

	if (!user) goto('/login');

	onMount(async () => {
		if (user) {
			const upfetch = up(fetch);
			let res = await upfetch(`${root}/users/${user.id}`, {
				method: 'GET'
			});

			if (profileUser?.customCss && $showCustomCss) {
				const style = document.createElement('style');
				style.innerHTML = profileUser.customCss;
				document.head.appendChild(style);
			}

			profileUser = res as ProfileUser;
		}
	});

	showCustomCss.subscribe((value) => {
		if (!value) {
			const styles = document.head.querySelectorAll('style');
			styles.forEach((style) => {
				if (style.innerHTML === profileUser?.customCss) {
					document.head.removeChild(style);
				}
			});
		} else if (profileUser?.customCss) {
			const style = document.createElement('style');
			style.innerHTML = profileUser.customCss;
			document.head.appendChild(style);
		}
	});

	async function saveChanges() {}

	setInterval(() => {
		let keys = Object.keys(newUserData) as (keyof ProfileUser)[];

		unsavedChanges.set(
			keys.some((key) => {
				return newUserData[key] !== profileUser![key];
			})
		);
	}, 1000);
</script>

{#if $unsavedChanges}
	<div class="msg-save-header">
		<p>You have unsaved changes!</p>
		<button onclick={saveChanges}>Save</button>
	</div>
{/if}

<div class="center">
	{#if user}
		<div class="header">
			<div class="inline">
				<img src={profileUser?.avatarUrl} alt={profileUser?.username} />
				{#if editing && editing.includes('username')}
					<input
						type="text"
						bind:value={newUserData!.username}
						defaultValue={profileUser!.username}
						onload={(ev) => (ev.target as any).select()}
						onblur={() => {
							editing = editing.filter((e) => e !== 'username');
						}}
						class="dy dy-input"
					/>
				{:else}
					<h1
						ondblclick={() => {
							editing = [...editing, 'username'];
						}}
					>
						{profileUser?.username}
					</h1>
				{/if}
			</div>

			<p
				class="biography"
				ondblclick={() => {
					editing = [...editing, 'biography'];
				}}
			>
				{#if editing && editing.includes('biography')}
					<!-- svelte-ignore element_invalid_self_closing_tag -->
					<textarea
						bind:value={newUserData!.biography}
						onblur={() => {
							editing = editing.filter((e) => e !== 'biography');
						}}
						defaultValue={profileUser!.biography ?? ''}
						class="dy dy-input"
					/>
				{:else if profileUser?.biography}
					{profileUser.biography}
				{:else}
					No biography set.
				{/if}
			</p>
		</div>
	{/if}
</div>

<style lang="scss">
	.center {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		margin-top: 2rem;
	}

	.inline {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.header {
		text-align: center;

		img {
			width: 100px;
			height: 100px;
			border-radius: 50%;
			object-fit: cover;
		}
	}
</style>
