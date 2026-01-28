import { writable } from 'svelte/store';
import type { LoggedUser } from './types';

export const user = writable<LoggedUser | null>(null);
