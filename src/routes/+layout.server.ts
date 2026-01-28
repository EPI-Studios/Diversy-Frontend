import { up } from 'up-fetch';
import { root } from '$lib/env.js';

const upfetch = up(fetch);

export const load = async ({ cookies }) => {
	let token = cookies.get('token') || null;
	let user = null;

	if (!token) return { user };

	try {
		let res = await upfetch(`${root}/auth/me`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		return { user: res };
	} catch (e) {
		console.error('Error fetching user data:', e);
		return { user: null };
	}
};
