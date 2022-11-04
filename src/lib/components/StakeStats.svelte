<script>
	import { amount } from '$lib/stores/stakeAmount';
	import { lockPeriod } from '$lib/stores/StakeLockPeriod';
	import { error } from '$lib/stores/error';
	import { ethers } from 'ethers';
</script>

<div class="text-center">
	Locking {!$error ? ethers.utils.commify($amount) : 0} TOAD for {$lockPeriod[0]}
	{$lockPeriod[0] > 1 ? 'weeks' : 'week'} - {(($lockPeriod[0] - 1) ** 1.5 + 5).toFixed(2)}% extra jackpot odds
</div>
