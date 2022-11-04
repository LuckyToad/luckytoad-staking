<script>
	import { approveTokensOnConnectedWallet, stakeTokensOnConnectedWallet, checkApprovalOnConnectedWallet } from '$lib/web3';
	import { connected } from 'svelte-ethers-store';
	import { amount } from '$lib/stores/stakeAmount';
	import { lockPeriod } from '$lib/stores/StakeLockPeriod';

	let lockApproved = false;

	const handleApprove = () => {
		if (!$amount) return;
		approveTokensOnConnectedWallet($amount);
	};
	const handleStake = () => {
		if (!lockApproved) return;
		stakeTokensOnConnectedWallet($amount, $lockPeriod[0]);
	};

	$: if ($connected) {
		setInterval(async () => {
			console.log(!!(await checkApprovalOnConnectedWallet($amount)));

			if (await checkApprovalOnConnectedWallet($amount)) lockApproved = true;
		}, 1000);
	}
</script>

<div class="flex gap-4 justify-center">
	<button on:click={handleApprove} disabled={!$amount} class="btn disabled:bg-brand-lemon-dark disabled:text-gray-400 disabled:cursor-not-allowed">Approve Lock</button>
	<button on:click={handleStake} disabled={!lockApproved} class="btn disabled:bg-brand-lemon-dark disabled:text-gray-400 disabled:cursor-not-allowed">Lock Tokens</button>
</div>
