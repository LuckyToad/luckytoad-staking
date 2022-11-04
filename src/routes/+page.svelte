<script lang="ts">
	import StakeAmountInput from '$lib/components/StakeAmountInput.svelte';
	import StakeStats from '$lib/components/StakeStats.svelte';
	import StakeLockPeriodSlider from '$lib/components/StakeLockPeriodSlider.svelte';
	import StakeButtons from '$lib/components/StakeButtons.svelte';
	import { connectionError } from '$lib/stores/connectionError';
</script>

{#if $connectionError}
	<p class="text-lg font-Inter font-bold text-red-700 text-center bg-brand-lemon-light">PLEASE CONNECT YOUR WALLET TO CONTINUE</p>
{/if}

<main class="flex justify-center items-center p-8">
	<div class="flex flex-col gap-4 max-w-lg w-full">
		<StakeAmountInput />
		<StakeStats />
		<StakeLockPeriodSlider />
		<StakeButtons />
	</div>
</main>
