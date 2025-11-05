// types/nuxt.d.ts
import type { Socket } from 'socket.io-client';

declare module '#app' {
    interface NuxtApp {
        $socket: Socket;
    }
    interface Message {
        id: number;
        text: string;
        sender: string;
        timestamp: Date;
    }

    interface Room {
        id: string; // Room ID could be a string (wallet addresses combined)
        name: string;
        participants: string[]; // List of user addresses in this chat
        messages: Message[];
    }

    interface Rooms {
        [key: string]: Room;
    }

    interface Toast {
        text: string;
        type: 'info' | 'warning' | 'error' | 'success';
        id?: number;
        timeoutId?: number;
    }
}
