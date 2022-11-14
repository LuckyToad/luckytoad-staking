<script type="ts">
	import { balance } from '$lib/stores/balance';
	import { connected, contracts } from 'svelte-ethers-store';
	import { amount } from '$lib/stores/stakeAmount';
	import { error } from '$lib/stores/error';

	const isAmountValid = (): boolean => {
		$error = false;
		let valid = true;
		if (!$amount) $error = true;
		if (typeof $amount !== 'number') $error = true;
		if ($amount <= 0) $error = true;
		if ($amount > $balance) $error = true;

		return $error ? (valid = !valid) : valid;
	};

	function onInput(e) {
		$amount = Number(e.target.value);

		isAmountValid();
	}
</script>

<div class="flex flex-col items-center">
	<input on:input={onInput} value={$amount} type="number" placeholder="Amount of tokens to lock" class="input-field" disabled={!$connected} />

	{#if $contracts.TOAD && $balance}
		<button
			on:click={() => {
				$amount = $balance - 0.000001;
				isAmountValid();
			}}
			class="text-brand-green-dark text-sm text-center">
			max: {$balance}
		</button>
	{/if}

	{#if $error}
		<p class="invalid-error">Please enter a valid amount.</p>
	{/if}
</div>

<style>
	input[type='number'] {
		-moz-appearance: textfield;
		appearance: textfield;
	}
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
	}
</style>
