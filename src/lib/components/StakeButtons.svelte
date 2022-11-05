<script>
	import { approveTokensOnConnectedWallet, stakeTokensOnConnectedWallet, checkApprovalOnConnectedWallet } from '$lib/web3';
	import { connected } from 'svelte-ethers-store';
	import { amount } from '$lib/stores/stakeAmount';
	import { lockPeriod } from '$lib/stores/StakeLockPeriod';

	let lockApproved = false;
	let approveUnlocked = false;
	let lockUnlocked = false;

	

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
			// Unlock the approval button only if there's an amount 
			

			if(!$amount) {
				approveUnlocked = false;
				lockUnlocked = false;
				return;
			}
			approveUnlocked = !lockApproved;
			lockUnlocked = lockApproved;

			let approval = await checkApprovalOnConnectedWallet($amount);
			console.log("Is approved?", approval);
			lockApproved = approval;
			

			


			
		}, 1000);
	}
</script>

<div class="flex gap-4 justify-center">
	<button on:click={handleApprove} disabled={!approveUnlocked} class="btn disabled:bg-brand-lemon-dark disabled:text-gray-400 disabled:cursor-not-allowed">Approve Lock</button>
	<button on:click={handleStake} disabled={!lockUnlocked} class="btn disabled:bg-brand-lemon-dark disabled:text-gray-400 disabled:cursor-not-allowed">Lock Tokens</button>
</div>
