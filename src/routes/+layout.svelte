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
</style>
