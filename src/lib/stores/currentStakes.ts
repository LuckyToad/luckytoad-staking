import { derived } from 'svelte/store';
import { connected, signer, signerAddress } from 'svelte-ethers-store';
import { getStakesForConnectedWallet } from '$lib/web3';

export const stakes = derived([connected, signer, signerAddress], ([$connected, $signer, $signerAddress], set) => {
	if (!$signer || !$signerAddress) return set(null);

	if ($connected) {
		setInterval(async () => {
			const stakes = await getStakesForConnectedWallet();
			set(stakes);
		}, 1000);
	}
});
