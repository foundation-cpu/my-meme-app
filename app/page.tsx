'use client';

import { useEffect, useState } from 'react';
import { init, postEvent } from '@tma.js/sdk';
import { useAccount, useConnect, useDisconnect, useChainId, useSwitchChain } from 'wagmi';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { address, isConnected, chain } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const { chains, switchChain } = useSwitchChain();

  useEffect(() => {
    try {
      init();
      postEvent('web_app_expand');
      setIsLoaded(true);
    } catch (e) {
      console.error('Telegram SDK init error:', e);
    }
  }, []);

  const triggerHaptic = () => {
    try {
      postEvent('web_app_trigger_haptic_feedback', {
        type: 'impact',
        impact_style: 'medium',
      });
    } catch (e) {
      // Fallback if testing outside Telegram webview
    }
  };

  const handleConnect = (connector: any) => {
    triggerHaptic();
    connect({ connector });
  };

  const handleDisconnect = () => {
    triggerHaptic();
    disconnect();
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-slate-950 text-white">
      <div className="w-full max-w-sm space-y-6 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-emerald-400">🚀 Meme Nonbank</h1>
          <p className="text-xs text-slate-400">
            {isLoaded ? 'Telegram Mini App Ready' : 'Loading SDK...'}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <h2 className="text-lg font-semibold text-slate-200">EVM Wallet</h2>

          {isConnected && address ? (
            <div className="space-y-3">
              <div className="p-3 bg-slate-950 rounded-xl border border-emerald-500/30 text-left">
                <p className="text-xs text-slate-400">Connected Address</p>
                <p className="text-sm font-mono text-emerald-400 truncate">{address}</p>
                <p className="text-xs text-slate-500 mt-1">Network: {chain?.name || chainId}</p>
              </div>

              {/* Network Switcher */}
              <div className="space-y-1 text-left">
                <p className="text-xs text-slate-400 mb-1">Switch Network:</p>
                <div className="grid grid-cols-2 gap-2">
                  {chains.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        triggerHaptic();
                        switchChain({ chainId: c.id });
                      }}
                      className={`py-1.5 px-3 text-xs font-medium rounded-lg border transition-all ${
                        c.id === chainId
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleDisconnect}
                className="w-full py-2.5 px-4 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-medium text-sm rounded-xl transition-all mt-2"
              >
                Disconnect Wallet
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {connectors.map((connector) => (
                <button
                  key={connector.uid}
                  onClick={() => handleConnect(connector)}
                  className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm rounded-xl shadow-lg shadow-emerald-500/20 transition-all"
                >
                  Connect {connector.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}