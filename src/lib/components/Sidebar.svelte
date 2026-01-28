<script lang="ts">
	import type { LoggedUser } from '$lib/types';
	import { Fa } from 'svelte-fa';
	import { faCommentDots, faHome, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
	export let user: LoggedUser | null = null;
</script>

<div class="sidebar">
	<div class="logo">
		<a href="/">
			<img src="/logo.png" alt="" />
		</a>
	</div>
	<div class="profile">
		{#if user}
			<a href="/profile">
				<img src={user.avatarUrl ?? '/guest-avatar.png'} alt="User Avatar" class="avatar" />
				<h2>{user.username}</h2>
			</a>
		{:else}
			<a href="/login">
				<img src="/guest-avatar.png" alt="Guest Avatar" class="avatar" />
				<h2>Guest</h2>
			</a>
		{/if}
	</div>
	<div class="links">
		<a href="/discover"
			><Fa icon={faMagnifyingGlass} />
			<p>Discover</p></a
		>
		{#if user}
			<a href="/messages"
				><Fa icon={faCommentDots} />
				<p>Messages</p></a
			>
		{/if}
	</div>
</div>

<style lang="scss">
	.sidebar {
		position: fixed;
		top: 0;
		left: 0;
		width: 250px;
		height: 100vh;
		background-color: #fbfbfb;
		color: #2c3e50;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 20px;
		box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);

		.logo {
			img {
				width: 150px;
			}
		}

		.profile {
			text-align: center;

			.avatar {
				width: 80px;
				height: 80px;
				border-radius: 50%;
				margin-bottom: 10px;
			}

			h2 {
				margin: 0;
				font-size: 1.2em;
			}

			a {
				color: inherit;
				text-decoration: none;

				&:hover {
					text-decoration: underline;
				}
			}
		}

		.links {
			margin-top: 30px;
			width: 100%;

			a {
				display: flex;
				align-items: center;
				color: inherit;
				text-decoration: none;
				font-size: 1em;
				justify-content: center;
				gap: 10px;
				transform: translateX(30px);
				border-radius: 15px;
				padding: 10px 15px;
				background-color: #e0e0e0;
				transition:
					transform 0.2s,
					background-color 0.2s;
				&:hover {
					background-color: #d0d0d0;
					transform: translateX(10px);
				}
			}
		}
	}
</style>
