<script lang="ts">
	import 'iconify-icon';
	import { Menu, MenuButton, MenuItems, MenuItem, Transition } from '@rgossiaux/svelte-headlessui';
	import { connected, signerAddress } from 'svelte-ethers-store';
	import { connect, disconnect } from '$lib/web3';
	import CurrentLocks from './CurrentLocks.svelte';
</script>

{#if !$connected}
	<button id="connectButton" class="flex items-center justify-center gap-1 p-2 md:px-2 md:py-1 sm:justify-end md:border md:border-brand-green-dark rounded-md bg-transparent w-max" on:click={connect}>
		<iconify-icon icon="mingcute:wallet-3-line" height="29px" class="text-brand-green-dark" />

		<div class="hidden md:flex md:flex-col md:items-start">
			<span class="text-red-600 text-[10px] font-bold leading-3">Not Connected</span>
			<span class="text-brand-green-dark leading-4">Connect Wallet</span>
		</div>
	</button>
{:else}
	<Menu class={'relative'}>
		<MenuButton class={`flex items-center px-2 py-1 gap-1 sm:justify-end md:border md:border-brand-green-dark rounded-md bg-transparent w-max`}>
			<div class="hidden md:flex md:flex-col md:items-start">
				<span class="text-green-600 text-[10px] font-bold leading-3">Connected</span>
				<span class="text-brand-green-dark leading-4">
					{$signerAddress.slice(0, 5)}…{$signerAddress.slice($signerAddress.length - 4, $signerAddress.length)}
				</span>
			</div>

			<iconify-icon icon="heroicons:chevron-down-20-solid" height={'24px'} class="hidden md:flex text-brand-green-dark" />

			<iconify-icon icon="mingcute:wallet-3-line" height="29px" class="flex md:hidden text-brand-green-dark" />
		</MenuButton>

		<Transition enter="transition duration-100 ease-out" enterFrom="transform scale-95 opacity-0" enterTo="transform scale-100 opacity-100" leave="transition duration-75 ease-out" leaveFrom="transform scale-100 opacity-100" leaveTo="transform scale-95 opacity-0">
			<MenuItems class={'bg-brand-lemon-light absolute right-0 flex flex-col w-max mt-2 origin-top-right divide-y divide-brand-lemon-dark rounded-md shadow-sm ring-1 ring-black ring-opacity-5 focus:outline-none'}>
				<MenuItem let:active>
					<button on:click={disconnect} class="text-brand-red hover:bg-brand-red hover:text-white group flex gap-1 rounded-md items-center w-full px-2 py-2 text-xs">
						Disconnect
						<iconify-icon icon="akar-icons:cross" height={'12px'} class="hidden md:flex group:text" />
					</button>
				</MenuItem>
				<MenuItem let:active>
					<CurrentLocks />
				</MenuItem>
			</MenuItems>
		</Transition>
	</Menu>
{/if}

<style>
	thead {
		overflow: hidden;
	}
	th {
		text-align: start;
		padding: 8px 12px;
		white-space: nowrap;
	}

	td {
		padding: 8px 12px;
	}
</style>
