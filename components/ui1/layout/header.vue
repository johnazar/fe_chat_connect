<template>
    <div class="mx-auto w-full max-w-7xl">
        <div class="flex justify-end gap-2 px-4">
            <ui1-common-lang-switcher />
            <ui1-common-color-switcher />
        </div>
        <div class="flex justify-between p-4">
            <div>Logo</div>

            <div class="flex gap-4">
                <nuxt-link to="/">Home</nuxt-link>
                <nuxt-link to="/chats">Chat</nuxt-link>
                <nuxt-link to="/test">Test</nuxt-link>
            </div>

            <div v-if="isConnected">
                <div class="w-28 overflow-hidden text-ellipsis">
                    {{ address }}
                </div>
                <button
                    class="rounded bg-secondary px-4 py-2 text-white"
                    @click="handleDisconnect"
                >
                    Disconnect
                </button>
            </div>
            <div v-else class="flex flex-col gap-1">
                <button
                    class="rounded bg-primary px-4 py-2 text-sm text-white"
                    @click="useEvent('modal:connect', true)"
                >
                    Connect Wallet
                </button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useAccount, useDisconnect } from '@wagmi/vue';

const { disconnect } = useDisconnect();
const handleDisconnect = async () => disconnect();
const { address, isConnected } = useAccount();
const { path } = useRoute();
watch(isConnected, () => {
    const is_connected = toValue(isConnected);
    if (path !== '/' && !is_connected) {
        return navigateTo('/');
    }
    if (is_connected) {
        useEvent('modal:connect', false);
    }
});
</script>
