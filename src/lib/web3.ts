import Onboard from '@web3-onboard/core';
import injectedModule from '@web3-onboard/injected-wallets';
import walletConnectModule from '@web3-onboard/walletconnect';
import { ethers } from 'ethers';
import abi from '$lib/abi.json';

import { defaultEvmStores, connected, provider, chainId, chainData, signer, signerAddress, contracts } from 'svelte-ethers-store';

// // const INFURA_HTTPS_URL = import.meta.env.VITE_INFURA_HTTPS_URL;

const injected = injectedModule();
const walletConnect = walletConnectModule();

let onboard = Onboard({
	wallets: [injected, walletConnect],
	chains: [
		{
			id: '0x1',
			token: 'ETH',
			label: 'Ethereum Mainnet',
			rpcUrl: 'https://mainnet.infura.io/v3/79feb803928a4e14a5124eeee64d81ff'
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
		await defaultEvmStores.attachContract('TOAD', '0x24861414c8845b8115397302e9dcfaab3f239826', abi);
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
