'use client';

import { ReactNode, useState } from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createAppKit } from '@reown/appkit/react';
import { mainnet, base, arbitrum, polygon } from '@reown/appkit/networks';
import { wagmiAdapter, projectId } from './config';

const metadata = {
  name: 'Meme Nonbank',
  description: 'Telegram Mini App Meme Payments',
  url: 'https://my-meme-app-one.vercel.app',
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
};

createAppKit({
  adapters: [wagmiAdapter],
  networks: [mainnet, base, arbitrum, polygon],
  metadata,
  projectId,
  features: {
    analytics: true,
  },
});

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}