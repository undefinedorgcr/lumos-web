/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState, useRef, useEffect } from 'react';
import { getChainId, getNodeUrl, getProvider, ARGENT_WEBWALLET_URL } from '@/lib/constants';
import { walletStarknetkitLatestAtom } from '@/state/ConnectedWallet';
import { useAtom } from 'jotai';
import { connect, disconnect } from 'starknetkit';
import { ChevronDown, ExternalLink, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WalletConnector() {
	const [wallet, setWallet] = useAtom(walletStarknetkitLatestAtom);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [network, setNetwork] = useState<string>('');
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (wallet?.chainId) {
			const chainId = wallet.chainId;
			setNetwork(chainId === 'SN_SEPOLIA' ? 'Sepolia Testnet' : 'Mainnet');
		}
	}, [wallet]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsDropdownOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const handleConnect = async () => {
		try {
			const chainId = getChainId();
			const nodeUrl = getNodeUrl();
			const provider = getProvider(nodeUrl);
			const { connectorData: connectedWallet } = await connect({
				modalMode: 'alwaysAsk',
				dappName: 'Lumos',
				resultType: 'wallet',
				argentMobileOptions: {
					dappName: 'Lumos',
					url: window.location.hostname,
					chainId,
					icons: [],
				},
			});

			if (connectedWallet) {
				const newWallet = {
					account: connectedWallet.account,
					chainId: connectedWallet.chainId == BigInt('23448594291968334') ? 'SN_MAIN' : 'SN_SEPOLIA',
				}
				setWallet(newWallet);
			} else {
				console.error('Account not found in connected wallet');
			}
		} catch (e) {
			console.error(e);
		}
	};

	const handleDisconnect = async (event: React.MouseEvent) => {
		event.preventDefault();
		try {
			await disconnect();
			setWallet(undefined);
			setIsDropdownOpen(false);
		} catch (error) {
			console.error('Failed to disconnect wallet:', error);
		}
	};

	const formatAddress = (address: string) => {
		if (!address) return '';
		return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
	};

	return (
		<div className="relative" ref={dropdownRef}>
			{wallet?.account ? (
				<>
					<motion.button
						onClick={() => setIsDropdownOpen(!isDropdownOpen)}
						className="custom-button flex items-center gap-2"
						whileTap={{ scale: 0.98 }}
					>
						<span className="hidden md:block">
							{formatAddress(wallet.account)}
						</span>
						<span className="block md:hidden">
							{formatAddress(wallet.account)}
						</span>
						<ChevronDown
							className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
						/>
					</motion.button>

					<AnimatePresence>
						{isDropdownOpen && (
							<motion.div
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								transition={{ duration: 0.2 }}
								className="absolute right-0 mt-2 w-60 bg-[#212322] border border-[#8B9E93] rounded-lg shadow-lg overflow-hidden z-50"
							>
								<div className="p-4 border-b border-[#8B9E93]/30">
									<div className="flex items-center gap-2 text-[#D6E8DC] text-sm mb-1">
										<div className={`w-2 h-2 rounded-full ${network === 'Sepolia Testnet' ? 'bg-blue-400' : 'bg-green-400'}`} />
										{network}
									</div>
									<div className="flex items-center justify-between">
										<p className="text-white text-sm truncate">
											{formatAddress(wallet.account)}
										</p>
										<a
											href={`https://${network === 'Sepolia Testnet' ? 'sepolia.' : ''}starkscan.co/contract/${wallet.account}`}
											target="_blank"
											rel="noopener noreferrer"
											className="text-[#8B9E93] hover:text-white"
										>
											<ExternalLink className="w-4 h-4" />
										</a>
									</div>
								</div>
								<button
									onClick={handleDisconnect}
									className="w-full p-3 flex items-center gap-2 text-[#D6E8DC] hover:bg-[#2a2c2a] transition-colors duration-300 cursor-pointer"
								>
									<LogOut className="w-4 h-4" />
									<span>Disconnect Wallet</span>
								</button>
							</motion.div>
						)}
					</AnimatePresence>
				</>
			) : (
				<motion.button
					onClick={handleConnect}
					className="custom-button"
					whileTap={{ scale: 0.95 }}
				>
					Connect Wallet
				</motion.button>
			)}
		</div>
	);
}
