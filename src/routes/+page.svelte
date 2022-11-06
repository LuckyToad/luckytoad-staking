<script lang="ts">
	import Start from '$lib/components/Start.svelte';
	import StakeAmountInput from '$lib/components/StakeAmountInput.svelte';
	import StakeStats from '$lib/components/StakeStats.svelte';
	import StakeLockPeriodSlider from '$lib/components/StakeLockPeriodSlider.svelte';
	import StakeButtons from '$lib/components/StakeButtons.svelte';
	import { connectionError } from '$lib/stores/connectionError';
	import { connected } from 'svelte-ethers-store';

	import { started } from '$lib/stores/started';
</script>

<main class="flex flex-col justify-center items-center p-8 gap-14">
	{#if !$started}
		<Start />
	{:else}
		{#if $connectionError}
			<p class="text-lg font-Inter font-bold text-red-700 text-center bg-brand-lemon-light">PLEASE CONNECT YOUR WALLET TO CONTINUE</p>
		{/if}
		<div class="flex flex-col gap-4 max-w-lg w-full">
			<StakeAmountInput />
			<StakeStats />
			<StakeLockPeriodSlider />
			<StakeButtons />
		</div>
	{/if}
</main>
