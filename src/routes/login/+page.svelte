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
				console.log(error);
				return (message = 'An error occurred. Please try again.');
			}
		}
	}
</script>

<div class="col">
	<h1>Get Into</h1>
	<img src="/logo.png" alt="Diversy Logo" />
</div>

<form on:submit|preventDefault bind:this={form} class="dy dy-form">
	{#if !codeSent}
		<label for="email">Email:</label>

		<div class="dy dy-inline">
			<input
				type="email"
				id="email"
				bind:value={email}
				required
				class="dy dy-input dy-input-full-width"
				autocomplete="off"
			/>
			<button on:click={proceed} class="dy dy-button">Send Code</button>
		</div>
	{:else}
		<label for="code">Verification Code:</label>

		<div class="dy dy-inline">
			<input
				type="text"
				id="code"
				bind:value={code}
				required
				minlength="6"
				maxlength="6"
				class="dy dy-input dy-input-full-width"
				autocomplete="off"
			/>
			<button on:click={proceed} class="dy dy-button">Verify and Login</button>
		</div>
	{/if}

	<div class="dy dy-message">
		{#key message}
			{#if message}
				<p>{message}</p>
			{/if}
		{/key}
	</div>
</form>

<style lang="scss">
	.col {
		display: flex;
		flex-direction: column;
		align-items: center;

		h1 {
			margin-bottom: 0;
		}

		img {
			width: 200px;
			height: auto;
			margin-top: 10px;
		}
	}
</style>
