import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Rooms, Message } from '#app';

export const useChatStore = defineStore('chat', () => {
    const rooms = ref<Rooms>({});
    const activeChat = ref<string | null>(null); // Track active user/chat

    // Create or get an existing room based on participant addresses
    function getOrCreateRoom(userAddress: string, contactAddress: string) {
        const roomId = [userAddress, contactAddress].sort().join('-'); // Unique room ID
        if (!rooms.value[roomId]) {
            rooms.value[roomId] = {
                id: roomId,
                name: `${contactAddress}`,
                participants: [userAddress, contactAddress],
                messages: [],
            };
        }
        return rooms.value[roomId];
    }

    function addMessage(
        chatRoomId: string,
        sender: string,
        messageText: string
    ) {
        const room = rooms.value[chatRoomId];
        if (room) {
            const newMessage: Message = {
                id: room.messages.length + 1,
                text: messageText,
                sender,
                timestamp: new Date(),
            };
            room.messages.push(newMessage);
        }
    }

    function setActiveChat(contactAddress: string, userAddress: string) {
        const room = getOrCreateRoom(userAddress, contactAddress);
        activeChat.value = room.id;
    }

    return { rooms, activeChat, getOrCreateRoom, addMessage, setActiveChat };
});
