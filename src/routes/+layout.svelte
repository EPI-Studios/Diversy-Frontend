<script lang="ts">
	import Sidebar from '$lib/components/Sidebar.svelte';
	import type { LoggedUser } from '$lib/types';

	export let data: { user: LoggedUser };
	const { user } = data;
</script>

<svelte:head>
	<link rel="icon" href="/icon.png" />
	<title>Diversy</title>
</svelte:head>

<main>
	<Sidebar {user} />
	<slot />
</main>

<style lang="scss">
	$btn-color: #4caf50;
	$btn-text-color: #ffffff;

	:global(body) {
		margin: 0;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		background-color: #f0f2f5;
		color: #333;
	}

	:global(main) {
		margin-left: 250px; /* Width of the sidebar */
		padding: 20px;
	}

	:global(.dy.dy-input) {
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 4px;
		font-size: 16px;
		box-sizing: border-box;
		outline: none;
	}

	:global(.dy.dy-input-full-width) {
		width: 100%;
	}

	:global(.dy.dy-textarea-full-width) {
		width: 100%;
		resize: vertical;
	}

	:global(.dy.dy-inline) {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-right: 10px;
		width: 100%;
	}

	:global(.dy.dy-button) {
		background-color: $btn-color;
		font-size: 16px;
		color: $btn-text-color;
		border: none;
		border-radius: 4px;
		height: 40px;
		cursor: pointer;
	}

	:global(.dy.dy-form div) {
		display: flex;
	}

	:global(.dy.dy-form div button) {
		width: 30%;
	}

	:global(.dy.dy-form div input) {
		width: 70%;
	}

	:global(.dy.dy-button:hover) {
		opacity: 0.8;
	}

	:global(.dy.dy-form) {
		background-color: #fff;
		padding: 20px;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		max-width: 400px;
		margin-inline: auto;
		display: flex;
		flex-direction: column;
		gap: 15px;

		* {
			align-items: center;
			justify-content: center;
		}
	}
</style>
