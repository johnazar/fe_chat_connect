// plugins/wagmi.js (or wagmi.client.js for client-only)
import { defineNuxtPlugin } from '#app';
import { WagmiPlugin, http, createConfig } from '@wagmi/vue';
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';
import { injected } from '@wagmi/vue/connectors';
import { mainnet, sepolia } from '@wagmi/vue/chains';

// Set up your Wagmi client configuration
const config = createConfig({
    autoConnect: true,
    // Configure your connectors, provider, etc.
    connectors: [injected()],
    chains: [mainnet, sepolia],
    transports: {
        [mainnet.id]: http(''),
        [sepolia.id]: http(''),
    },
});

// Optionally, create a custom QueryClient instance
const queryClient = new QueryClient();

export default defineNuxtPlugin((nuxtApp) => {
    // Use the WagmiPlugin with the provided client and queryClient
    nuxtApp.vueApp.use(WagmiPlugin, { config });
    nuxtApp.vueApp.use(VueQueryPlugin, { queryClient });
});
