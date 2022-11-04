import Onboard from '@web3-onboard/core';
import injectedModule from '@web3-onboard/injected-wallets';
import walletConnectModule from '@web3-onboard/walletconnect';
import { ethers, BigNumber } from 'ethers';
import abi from '$lib/abi.json';
import stakingabi from '$lib/stakingAbi.json';

import { defaultEvmStores, connected, provider, chainId, chainData, signer, signerAddress, contracts } from 'svelte-ethers-store';
import { get } from 'svelte/store';
import { formatUnits, parseUnits } from 'ethers/lib/utils';

const INFURA_HTTPS_URL = import.meta.env.VITE_INFURA_HTTPS_URL;
const INFURA_GOERLI_URL = import.meta.env.VITE_INFURA_GOERLI_URL;

const injected = injectedModule();
const walletConnect = walletConnectModule();

let onboard = Onboard({
	wallets: [injected, walletConnect],
	chains: [
		{
			id: '0x1',
			token: 'ETH',
			label: 'Ethereum Mainnet',
			rpcUrl: INFURA_HTTPS_URL
		},
		{
			id: '0x5',
			token: 'goETH',
			label: 'Ethereum Goerli',
			rpcUrl: INFURA_GOERLI_URL
		}
	],
	appMetadata: {
		name: 'Lucky Toad',
		icon: 'logo-toad-no-text-transparent-bg.png',
		logo: 'logo-text-transparent-bg.png',
		description: 'temp-description',
		recommendedInjectedWallets: [
			{ name: 'MetaMask', url: 'https://metamask.io' },
			{ name: 'WalletConnect', url: 'https://walletconnect.com/' }
		]
	},
	accountCenter: {
		desktop: {
			enabled: false,
			position: 'topRight'
		},
		mobile: {
			enabled: false,
			position: 'topRight'
		}
	},
	connect: {
		// showSidebar: false
	},

	i18n: {
		en: {
			connect: {
				selectingWallet: {
					header: 'Select a Wallet',
					sidebar: {
						heading: '',
						subheading: '',
						paragraph: ''
					}
				}
			}
		}
	}
});

const walletsSubscription = onboard.state.select('wallets');
const { unsubscribe } = walletsSubscription.subscribe(async (wallets) => {
	const walletProvider = wallets[0]?.provider;

	if (walletProvider) {
		const provider = new ethers.providers.Web3Provider(walletProvider, 'any');
		await defaultEvmStores.setProvider(provider);
		await defaultEvmStores.attachContract('TOAD', '0xBfB2b6870501a6Ff17121D676A0A45a38c9eeD1e', abi);
	}
	updateAlreadyConnectedWallets();
});

export const connect = async () => {
	const wallets = await onboard.connectWallet();
};

export const disconnect = async () => {
	const connectedWallet = onboard.state.get().wallets[0];
	await onboard.disconnectWallet({ label: connectedWallet.label });
	await defaultEvmStores.disconnect();
};

// connect back on reload
if (typeof window !== 'undefined') {
	const alreadyConnectedWallets = JSON.parse(window.sessionStorage.getItem('ConnectedWallets'));
	if (alreadyConnectedWallets && alreadyConnectedWallets.length > 0) {
		onboard
			.connectWallet({
				autoSelect: { label: alreadyConnectedWallets[0], disableModals: true }
			})
			.catch(console.error);
	}
}

const updateAlreadyConnectedWallets = async () => {
	const connectedWalletsLabels = onboard.state.get().wallets.map(({ label }) => label);
	window.sessionStorage.setItem('ConnectedWallets', JSON.stringify(connectedWalletsLabels));
};

interface Stake {
	amount: string;
	unlockTime: number;
	multiplier: string;
	stakeid: number;
	index: number;
}

export const getStakesForConnectedWallet = async (): Promise<Stake[]> => {
	const sig = get(signer);
	// Connect to the staking contract
	const stakingContract: ethers.Contract = new ethers.Contract('0x23305ae66432644427fe97C7469E9F06e7D84041', stakingabi, sig);
	// Get the stakes for this wallet
	const holdersStakes = await stakingContract.queryHolderStakes(await sig.getAddress());
	let stakes: Stake[] = [];
	for (let i = 0; i < holdersStakes.amounts.length; i++) {
		let stake: Stake = { amount: formatUnits(holdersStakes.amounts[i], 9), unlockTime: holdersStakes.unlockTimes[i], multiplier: formatUnits(holdersStakes.stakeMultipliers[i], 5), stakeid: holdersStakes.stakeIds[i], index: i };
		stakes.push(stake);
	}
	return stakes;
};

export const approveTokensOnConnectedWallet = async (amount: number): Promise<void> => {
	const bigNumberAmount = ethers.BigNumber.from(amount);

	const sig = get(signer);
	const tokenContract = new ethers.Contract('0xBfB2b6870501a6Ff17121D676A0A45a38c9eeD1e', abi, sig);
	const response = await tokenContract.approve('0x23305ae66432644427fe97C7469E9F06e7D84041', bigNumberAmount);
	const reply = await response.wait();
};

export const stakeTokensOnConnectedWallet = async (amount: BigNumber, weeks: number): Promise<void> => {
	const sig = get(signer);
	const stakingContract: ethers.Contract = new ethers.Contract('0x23305ae66432644427fe97C7469E9F06e7D84041', stakingabi, sig);
	// Send the new stake info
	const response = await stakingContract.stakeTokens(amount, weeks);
	const reply = await response.wait();
};

export const unstakeTokensOnConnectedWallet = async (stakeId: number, index: number): Promise<void> => {
	const sig = get(signer);
	const stakingContract: ethers.Contract = new ethers.Contract('0x23305ae66432644427fe97C7469E9F06e7D84041', stakingabi, sig);
	// Send the unstake details and wait for a response
	const response = await stakingContract.unstakeTokens(stakeId, index);
	const reply = await response.wait();
};

export const transferStakeFromConnectedWallet = async (addressTo: string, stakeId: number, index: number): Promise<void> => {
	const sig = get(signer);
	const stakingContract: ethers.Contract = new ethers.Contract('0x23305ae66432644427fe97C7469E9F06e7D84041', stakingabi, sig);
	// Send the txn
	const response = await stakingContract.transferStakeOwnership(stakeId, index, addressTo);
	const reply = await response.wait();
};

export const checkApprovalOnConnectedWallet = async (amount: number): Promise<boolean> => {
	const bigNumberAmount = ethers.BigNumber.from(amount);

	const sig = get(signer);
	const tokenContract = new ethers.Contract('0xBfB2b6870501a6Ff17121D676A0A45a38c9eeD1e', abi, sig);
<<<<<<< HEAD
	const resp: BigNumber = await tokenContract.allowance(await sig.getAddress(), '0x23305ae66432644427fe97C7469E9F06e7D84041');

	return (resp.gte(amt));
}
=======
	const resp = await tokenContract.allowance(await sig.getAddress(), '0x23305ae66432644427fe97C7469E9F06e7D84041');
	const amtAllowed: BigNumber = resp[0];
	return amtAllowed.gte(bigNumberAmount);
};
>>>>>>> fef5c40099fe36ecd1869410992474fbf12aa060
