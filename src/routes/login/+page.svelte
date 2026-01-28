<script lang="ts">
	import { goto } from '$app/navigation';
	import { root } from '$lib/env';
	import { up } from 'up-fetch';

	const upfetch = up(fetch);
	import type { LoggedUser } from '$lib/types';

	export let data: { user: LoggedUser | null };

	if (data.user) goto('/');

	let email = '';
	let codeSent = false;
	let code = '';

	$: console.log({ email, codeSent, code });

	let form: HTMLFormElement;

	let message = '';

	async function proceed() {
		if (!codeSent) {
			try {
				let response = await upfetch(`${root}/auth`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
					body: new URLSearchParams({ email })
				});

				message = response.message || 'Verification code sent to your email.';
				codeSent = true;
			} catch (error) {
				return (message = 'An error occurred. Please try again.');
			}
		} else {
			if (code.length !== 6) return (message = 'Please enter a valid 6-digit code.');
			if (!email.length) return (message = 'Email is required.');

			try {
				let response = await upfetch(`${root}/auth/confirm`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
					body: new URLSearchParams({ email, code })
				});

				let token = response.token;

				document.cookie = `token=${token}; Path=/; Max-Age=${60 * 60 * 24 * 30}; SameSite=Lax`;
				await goto('/');
			} catch (error) {
				return (message = 'An error occurred. Please try again.');
			}
		}
	}
</script>

<main>
	<h1>Get into Diversy</h1>

	<form on:submit|preventDefault bind:this={form}>
		{#if !codeSent}
			<label for="email">Email:</label>
			<input type="email" id="email" bind:value={email} required />
			<button on:click={proceed}>Send Code</button>
		{:else}
			<label for="code">Verification Code:</label>
			<input type="text" id="code" bind:value={code} required minlength="6" maxlength="6" />
			<button on:click={proceed}>Verify and Login</button>
		{/if}

		<div class="message">
			{#key message}
				<p>{message}</p>
			{/key}
		</div>
	</form>
</main>
