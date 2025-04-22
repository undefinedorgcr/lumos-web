import { RpcProvider, constants } from 'starknet';

export const getAddresses = (chainId: string | undefined) => ({
});

export const getBraavosChainId = (chainId: string) =>
	chainId === constants.NetworkName.SN_MAIN
		? '0x534e5f4d41494e'
		: '0x534e5f5345504f4c4941';

export const getBaseUrl = (chainId: string) =>
	chainId === 'SN_SEPOLIA'
		? 'https://sepolia-api.ekubo.org'
		: 'https://mainnet-api.ekubo.org';

export const ARGENT_SESSION_SERVICE_BASE_URL =
	process.env.NEXT_PUBLIC_ARGENT_SESSION_SERVICE_BASE_URL ||
	'https://cloud.argent-api.com/v1';

export const ARGENT_WEBWALLET_URL =
	process.env.NEXT_PUBLIC_ARGENT_WEBWALLET_URL || 'https://web.argent.xyz';

export const getNodeUrl = (chainId?: string) =>
	chainId === 'SN_SEPOLIA'
		? process.env.NEXT_PUBLIC_SEPOLIA_RPC
		: process.env.NEXT_PUBLIC_MAINNET_RPC;

export const getProvider = (nodeUrl: string | undefined) : RpcProvider =>
	new RpcProvider({ nodeUrl });

export const getChainId = (chainId?: string) =>
	chainId === 'SN_SEPOLIA'
		? constants.NetworkName.SN_SEPOLIA
		: constants.NetworkName.SN_MAIN;
