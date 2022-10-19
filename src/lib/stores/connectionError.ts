import { derived } from 'svelte/store';
import { connected } from 'svelte-ethers-store';

export const connectionError = derived(connected, ($connected, set) => {
	$connected ? set(false) : set(true);
});
