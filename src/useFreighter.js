import { useState, useCallback, useEffect } from 'react';
import { isAllowed, setAllowed, requestAccess, getUserInfo, signTransaction } from '@stellar/freighter-api';

export function useFreighter() {
    const [publicKey, setPublicKey] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isAllowedState, setIsAllowedState] = useState(false);

    useEffect(() => {
        const checkConnection = async () => {
            if (await isAllowed()) {
                setIsAllowedState(true);
                const { publicKey } = await getUserInfo();
                if (publicKey) {
                    setPublicKey(publicKey);
                    setIsConnected(true);
                }
            }
        };
        checkConnection();
    }, []);

    const connectWallet = useCallback(async () => {
        try {
            if (!(await isAllowed())) {
                await setAllowed();
                setIsAllowedState(true);
            }

            const accessResponse = await requestAccess();
            if (accessResponse) {
                setPublicKey(accessResponse);
                setIsConnected(true);
                return accessResponse;
            }
        } catch (e) {
            console.error('Failed to connect to Freighter:', e);
            return null;
        }
    }, []);

    const signTx = useCallback(async (xdr, network = 'TESTNET') => {
        try {
            const signedTransactionResponse = await signTransaction(xdr, {
                network,
                networkPassphrase: network === 'TESTNET' ? 'Test SDF Network ; September 2015' : 'Public Global Stellar Network ; September 2015'
            });
            return signedTransactionResponse;
        } catch (e) {
            console.error('Failed to sign transaction:', e);
            return null;
        }
    }, []);

    return { publicKey, isConnected, isAllowed: isAllowedState, connectWallet, signTx };
}
