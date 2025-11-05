<template>
    <Ui1Modals :show="showConnectModal" @close="console.log('close')">
        <template #header>
            <div
                class="flex items-center justify-between rounded-t border-b border-gray-200 p-4 dark:border-gray-600 md:p-5"
            >
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    Connect Wallet
                </h3>
                <button
                    type="button"
                    class="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="default-modal"
                    @click="showConnectModal = false"
                >
                    <svg
                        class="h-3 w-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
        </template>
        <div class="flex flex-col space-y-4 p-4 md:p-5">
            <button
                v-for="connector in connectors"
                :key="connector.name"
                class="rounded bg-primary px-4 py-2 text-sm text-white"
                @click="connect({ connector, chainId })"
            >
                {{ connector.name }}
            </button>
        </div>
        <template #footer> </template>
    </Ui1Modals>
</template>
<script setup lang="ts">
import { useConnect, useChainId } from '@wagmi/vue';
const chainId = useChainId();

const { connectors, connect } = useConnect();
const showConnectModal = ref(false);
useListen('modal:connect', (e) => {
    showConnectModal.value = e;
});
</script>
