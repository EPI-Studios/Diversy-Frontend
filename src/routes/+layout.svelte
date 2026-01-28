<script>
	import Sidebar from '$lib/components/Sidebar.svelte';
</script>

<svelte:head>
	<link rel="icon" href="/icon.png" />
	<title>Diversy</title>
</svelte:head>

<main>
	<Sidebar />
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
