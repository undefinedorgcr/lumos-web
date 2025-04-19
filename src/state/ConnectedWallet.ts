import { atomWithStorage } from 'jotai/utils';
import { StarknetWindowObject } from 'starknetkit';

export const walletStarknetkitLatestAtom = atomWithStorage<
	undefined | null | StarknetWindowObject
>('walletStarknetkitLatest', undefined, 
    {
		getItem: (key) => {
			const storedValue = sessionStorage.getItem(key);
			if (storedValue == 'undefined') {
				return undefined;
			}
			return storedValue ? JSON.parse(storedValue) : undefined;
		},
		setItem: (key, value) => {
			sessionStorage.setItem(key, JSON.stringify(value));
		},
		removeItem: (key) => {
			sessionStorage.removeItem(key);
		},
	}
);
