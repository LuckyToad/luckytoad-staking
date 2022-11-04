<script lang="ts">
	import Slider from '@bulatdashiev/svelte-slider';
	import { ethers } from 'ethers';
	import { connected, contracts } from 'svelte-ethers-store';
	import { balance } from '$lib/stores/balance';
	import { connectionError } from '$lib/stores/connectionError';
	import { approveTokensOnConnectedWallet, stakeTokensOnConnectedWallet } from '$lib/web3';

	let amount = 0;
	let lockPeriod = [1, 26];

	let error: boolean;
	const isAmountValid = (): boolean => {
		error = false;
		let valid = true;
		if (!amount) error = true;
		if (typeof amount !== 'number') error = true;
		if (amount < 0) error = true;
		if (amount > $balance) error = true;
		return error ? (valid = !valid) : valid;
	};

	function onInput(e) {
		amount = Number(e.target.value);

		isAmountValid();
	}
</script>

{#if $connectionError}
	<p class="text-lg font-Inter font-bold text-red-700 text-center bg-brand-lemon-light">PLEASE CONNECT YOUR WALLET TO CONTINUE</p>
{/if}

<main class="flex justify-center items-center p-8">
	<div class="flex flex-col gap-4">
		<input on:input={onInput} type="number" placeholder="Amount of tokens to lock" class="input-field" disabled={!$connected} />

		<p class="text-brand-green-dark text-sm text-center">
			{#if $contracts.TOAD && $balance}
				max: {$balance}
			{/if}
		</p>

		{#if error}
			<p class="invalid-error">Please enter a valid amount.</p>
		{/if}

		<div>
			Locking {!error ? ethers.utils.commify(amount) : 0} TOAD for {lockPeriod[0]}
			{lockPeriod[0] > 1 ? 'weeks' : 'week'} - {((lockPeriod[0] - 1) ** 1.5 + 5).toFixed(2)}% extra jackpot odds

			<div class="px-6">
				<Slider bind:value={lockPeriod} min={1} max={26} disabled={!$connected}>
					<span slot="left" class="flex justify-center items-center h-8 w-10">
						<img src="logo-toad-no-text-transparent-bg.png" alt="toad" class="h-full" />
					</span>
				</Slider>
			</div>
		</div>

		<div class="flex gap-4 justify-center">
			<button class="btn" on:click={() => approveTokensOnConnectedWallet(amount)}>Approve Lock</button>
			<button class="btn" on:click={() => stakeTokensOnConnectedWallet(amount, lockPeriod[0])}>Lock Tokens</button>
		</div>
	</div>
</main>

<style>
	div {
		--thumb-bg: transparent;
		--progress-bg: #dad0a3;
		--track-bg: #dad0a3;
	}
	input[type='number'] {
		-moz-appearance: textfield;
		appearance: textfield;
	}
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
	}
</style>
