// plugins/socket.client.js
import { io, type Socket } from 'socket.io-client';

export default defineNuxtPlugin(() => {
    // Read from Nuxt runtime config (public). It can be set with NUXT_PUBLIC_SIGNALING_WS
    const config = useRuntimeConfig();
    let socketServerUrl = config.public?.signalingWsUrl as string | undefined;

    // If not provided, default to same origin with port 3001
    if (!socketServerUrl) {
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        socketServerUrl = `${protocol}//${window.location.hostname}:3001`;
    }

    // Initialize the Socket.IO client
    const createSocketConnection = (walletAddress: string): Socket => {
        const socket: Socket = io(socketServerUrl, {
            path: '/ws-path/',
            auth: { address: walletAddress },
            withCredentials: true,
        });
        // Optional: attach some basic event listeners for debugging
        socket.on('connect', () => {
            console.log('Socket connected:', socket.id);
        });

        socket.on('disconnect', () => {
            console.log('Socket disconnected');
        });
        // listen for error events
        socket.on('error', (err) => {
            console.error('Socket encountered error:', err);
        });
        // socket.on('onlineUsers', (payload) => {
        //     useEvent('chat:users', payload);
        // });

        return socket;
    };

    // Provide the socket instance to your Nuxt app
    return {
        provide: {
            createSocketConnection,
        },
    };
});
