import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { mainnet, base, arbitrum, polygon } from '@reown/appkit/networks';

// Get a free projectId at https://cloud.reown.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || '7a65e9a9e26dd919e55ff5e171a411a7';

export const networks = [mainnet, base, arbitrum, polygon];

export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks,
});

export const config = wagmiAdapter.wagmiConfig;