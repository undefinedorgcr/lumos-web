/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { getChainId, getNodeUrl, getProvider, ARGENT_WEBWALLET_URL } from '@/lib/constants';
import { walletStarknetkitLatestAtom } from '@/state/ConnectedWallet';
import { useAtom } from 'jotai';
import { connect, disconnect } from 'starknetkit';

export default function WalletConnector() {
	const [wallet, setWallet] = useAtom(walletStarknetkitLatestAtom);

	const handleConnect = async () => {
		try {
			const chainId = getChainId();
			const nodeUrl = getNodeUrl();
			const provider = getProvider(nodeUrl);
			const { wallet: connectedWallet } = await connect({
				modalMode: 'alwaysAsk',
				webWalletUrl: ARGENT_WEBWALLET_URL,
				argentMobileOptions: {
					dappName: 'Lumos',
					url: window.location.hostname,
					chainId,
					icons: [],
				},
			});
			setWallet(connectedWallet);
		} catch (e) {
			console.error(e);
			alert((e as any).message);
		}
	};

	const handleDisconnect = async (event: any) => {
		event.preventDefault();
		try {
			await disconnect();
			setWallet(undefined);
		} catch (error) {
			console.error('Failed to disconnect wallet:', error);
		}
	};

	return (
		<div>
			{wallet ? (
				<p
					className="text-l text-gray-400 hover:text-white hover:cursor-pointer underline"
					onClick={handleDisconnect}
				>
					Disconnect Wallet
				</p>
			) : (
				<p
					className="text-l text-gray-400 hover:text-white hover:cursor-pointer underline"
					onClick={handleConnect}
				>
					Connect Wallet
				</p>
			)}
		</div>
	);
}
