import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const persistStore = (key: string, initial: boolean) => {
	const persist = browser && sessionStorage.getItem(key);
	const data = persist ? JSON.parse(persist) : initial;

	const store = writable(data);

	store.subscribe((value) => {
		browser && sessionStorage.setItem('started', value);
	});

	return store;
};

export const started = persistStore('started', false);
