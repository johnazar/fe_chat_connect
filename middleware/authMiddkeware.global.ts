import { useAccount } from '@wagmi/vue';

export default defineNuxtRouteMiddleware((to) => {
    const { isConnected } = useAccount();
    if (to.path !== '/' && !isConnected.value) {
        // return navigateTo('/');
    }
});
