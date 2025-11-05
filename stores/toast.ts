import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Toast } from '#app';
import { useListen } from '~/composables/useEventBus';

export const useToastStore = defineStore('toast', () => {
    const toasts = ref<Toast[]>([]);

    const pushToast = (toast: Toast) => {
        const id = Date.now();
        toasts.value.push({ ...toast, id });
        // Set a timeout to remove the toast after 10 seconds
        setTimeout(() => {
            removeToast(id);
        }, 10000);
    };

    const removeToast = (id: number) => {
        toasts.value = toasts.value.filter((toast) => toast.id !== id);
    };

    useListen('toast', (toast: Toast) => {
        pushToast({ text: toast.text, type: toast.type, id: Date.now() });
    });
    useListen('chat:request', ({ from }) => {
        pushToast({
            text: `Incoming chat request from ${from}`,
            type: 'info',
            id: Date.now(),
        });
    });

    return { toasts, pushToast, removeToast };
});
