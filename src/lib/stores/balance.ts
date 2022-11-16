import { derived } from 'svelte/store';
import { ethers } from 'ethers';
import { provider, signer, signerAddress, contracts } from 'svelte-ethers-store';

export const balance = derived([signer, provider, contracts, signerAddress], ([$signer, $provider, $contracts, $signerAddress], set) => {
	if (!provider || !$signer || !$provider || !$signerAddress || !$contracts.TOAD) return set(null);

	provider.subscribe(async (provider) => {
		provider.on('block', async () => {
			const balance = await $contracts.TOAD.balanceOf($signerAddress);
			const decimals = await $contracts.TOAD.decimals();
			const formatted = Math.trunc(Number(ethers.utils.formatUnits(balance, decimals)));

			set(formatted);
		});
	});
});
