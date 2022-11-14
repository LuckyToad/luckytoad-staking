<script>
	import 'iconify-icon';
	import { Menu, MenuButton, MenuItems, MenuItem, Transition } from '@rgossiaux/svelte-headlessui';
	import { stakes } from '$lib/stores/currentStakes';
	import moment from 'moment';
	import { unstakeTokensOnConnectedWallet } from '$lib/web3';
</script>

<Menu class={'relative'}>
	<MenuButton class={` hover:text-white group text-brand-green-dark hover:bg-brand-green-dark leading-4 flex items-center justify-center gap-1 sm:justify-end bg-transparent rounded-md w-full px-2 py-2 text-xs`}>
		<iconify-icon icon="fa6-solid:lock" height="15px" class="group-text" />
		Current Locks
	</MenuButton>

	<Transition enter="transition duration-100 ease-out" enterFrom="transform scale-95 opacity-0" enterTo="transform scale-100 opacity-100" leave="transition duration-75 ease-out" leaveFrom="transform scale-100 opacity-100" leaveTo="transform scale-95 opacity-0">
		<MenuItems class={'absolute right-0 flex flex-col w-max mt-2 origin-top-right divide-y divide-gray-100 rounded-md shadow-sm ring-1 ring-black ring-opacity-5 focus:outline-none bg-brand-lemon-light '}>
			<MenuItem>
				<table>
					<thead>
						<th> Extra odds </th>
						<th> Amount </th>
						<th> Unlock Date </th>
					</thead>
					{#if $stakes}
						{#each $stakes as { amount, multiplier, unlockTime, stakeid, index }}
							<tr>
								<td>{multiplier}</td>
								<td>{amount}</td>
								{#if Date.now() >= unlockTime}
									<td>{moment.unix(unlockTime).format('MMM Do, YY')}</td>
								{:else}
									<td>
										<button on:click={() => unstakeTokensOnConnectedWallet(stakeid, index)}>UNLOCK</button>
									</td>
								{/if}
							</tr>
						{/each}
					{/if}
				</table>
			</MenuItem>
		</MenuItems>
	</Transition>
</Menu>

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
