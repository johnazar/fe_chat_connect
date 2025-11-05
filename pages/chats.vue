<template>
    <div class="flex">
        <!-- Sidebar (visible on desktop) -->
        <aside class="hidden border md:block md:w-64">
            <div class="p-4">
                <h2 class="my-4 text-lg font-bold">Active Chat Rooms</h2>
                <ul>
                    <li
                        v-for="contact in onlineUsers"
                        :key="contact"
                        :class="[
                            'mb-2 cursor-pointer overflow-hidden text-ellipsis rounded p-2',
                            chatStore.activeChat?.includes(contact)
                                ? 'bg-primary text-white'
                                : 'hover:bg-gray-100',
                            chatRequests?.some(
                                (request) =>
                                    request.from === contact &&
                                    request.state === 'pending'
                            )
                                ? 'animate-pulse border-2 border-primary'
                                : '',
                        ]"
                        @click="selectChat(contact)"
                    >
                        {{ contact }}
                    </li>
                </ul>
            </div>
        </aside>
        <!-- Main Chat Area -->
        <div class="flex flex-1 flex-col">
            <!-- Mobile Header with Hamburger Menu -->
            <header
                class="flex items-center justify-between overflow-hidden border-b p-4 md:hidden"
            >
                <button
                    class="text-gray-600 focus:outline-none"
                    @click="isSidebarOpen = true"
                >
                    <!-- Hamburger icon -->
                    <svg
                        class="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
                <h1
                    class="max-w-64 overflow-hidden text-ellipsis text-xl font-bold"
                >
                    {{ chatRoom?.name }}
                    <!-- {{ chatStore?.activeChat }} -->
                </h1>
                <!-- Spacer -->
            </header>
            <!-- Chat Header for Desktop -->
            <header
                :class="[
                    'hidden items-center justify-between p-4 md:flex',
                    chatRoom?.name ? 'border-b' : '',
                ]"
            >
                <h1 class="text-2xl font-bold">
                    {{ chatRoom?.name }}
                </h1>
            </header>
            <!-- Chat Messages Container -->
            <div
                v-if="chatStore.activeChat"
                class="flex-1 overflow-y-auto bg-gray-50 p-4"
            >
                <div
                    v-if="
                        !chatRequests?.some(
                            (request) =>
                                request.connectionId === chatStore.activeChat
                        )
                    "
                    class="text-center text-gray-500"
                >
                    <div>No messages yet. Start chatting!</div>
                    <button
                        class="rounded bg-primary p-2 text-white"
                        @click="
                            requestChat(
                                chatRoom?.participants.find(
                                    (p) => p !== userAddress
                                ) ?? ''
                            )
                        "
                    >
                        Request Chat
                    </button>
                </div>
                <div
                    v-else-if="
                        chatRequests?.find(
                            (request) =>
                                request.connectionId === chatStore.activeChat &&
                                request.state === 'pending'
                        )
                    "
                    class="text-center text-gray-500"
                >
                    <div>Wants to chat</div>
                    <div class="flex justify-center gap-5">
                        <button
                            class="rounded bg-primary p-2 text-white"
                            @click="acceptChat(chatRoom?.name)"
                        >
                            Accept
                        </button>
                        <button
                            class="rounded bg-primary p-2 text-white"
                            @click="rejectChat(chatRoom?.name)"
                        >
                            Reject
                        </button>
                    </div>
                </div>
                <div
                    v-for="msg in chatRoom?.messages"
                    :key="msg.id"
                    class="mb-4 rounded bg-white p-3 shadow-sm"
                >
                    <div class="mb-1 flex items-center justify-between">
                        <span
                            class="max-w-64 overflow-hidden text-ellipsis font-semibold"
                            >{{ msg.sender }}</span
                        >
                        <span class="text-xs text-gray-500">{{
                            formatTimestamp(msg.timestamp)
                        }}</span>
                    </div>
                    <p>{{ msg.text }}</p>
                </div>
            </div>
            <!-- Chat Input Area -->
            <div v-if="chatStore.activeChat" class="border-t p-4">
                <form class="flex" @submit.prevent="sendMessage">
                    <input
                        v-model="newMessage"
                        type="text"
                        placeholder="Type your message..."
                        required
                        class="flex-1 rounded-l border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        class="rounded-r bg-blue-500 px-4 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
        <transition name="fade">
            <div v-if="isSidebarOpen" class="fixed inset-0 z-50 flex md:hidden">
                <div class="w-64 border-r bg-white p-4">
                    <div class="mb-4 flex items-center justify-between">
                        <h2 class="text-lg font-bold">Active Chat Rooms</h2>
                        <button
                            class="text-gray-600 focus:outline-none"
                            @click="isSidebarOpen = false"
                        >
                            <!-- Close icon -->
                            <svg
                                class="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <ul>
                        <li
                            v-for="contact in onlineUsers"
                            :key="contact"
                            :class="[
                                'mb-2 cursor-pointer overflow-hidden text-ellipsis rounded p-2',
                                chatStore.activeChat?.includes(contact)
                                    ? 'bg-primary text-white'
                                    : 'hover:bg-gray-100',
                                chatRequests?.some(
                                    (request) => request.from === contact
                                )
                                    ? 'animate-pulse border-2 border-primary'
                                    : '',
                            ]"
                            @click="selectChat(contact)"
                        >
                            {{ contact }}
                        </li>
                    </ul>
                </div>
                <!-- Clicking outside the sidebar closes it -->
                <div class="flex-1" @click="isSidebarOpen = false"></div>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useChatStore } from '~/stores';
import { useAccount } from '@wagmi/vue';
import type { Socket } from 'socket.io-client';

const { $createSocketConnection } = useNuxtApp();
let socket: Socket | null = null;
const isSidebarOpen = ref(false);

const chatStore = useChatStore();
const onlineUsers = ref<string[]>([]); // online users
const userAddress = ref(''); // Get from your auth system
const newMessage = ref('');
const { address } = useAccount();
userAddress.value = address.value ?? '';

interface ChatRequest {
    from: string;
    connectionId: string;
    data: { sdp: RTCSessionDescriptionInit; candidate?: RTCIceCandidate };
    offer: RTCSessionDescriptionInit;
    answer?: RTCSessionDescriptionInit;
    state?: 'pending' | 'accepted' | 'rejected';
}

const chatRequests = ref<ChatRequest[]>([]);

const peerConnections = new Map<
    string,
    { peerConnection: RTCPeerConnection; chatChannel?: RTCDataChannel | null }
>();

const iceconfig = {
    iceServers: [
        { urls: 'stun:stun.l.google.com:19302' }, // Free Google STUN server
        { urls: 'stun:stun1.l.google.com:19302' },
        { urls: 'stun:stun2.l.google.com:19302' },
        { urls: 'stun:stun3.l.google.com:19302' },
    ],
};

// Computed to get the current chat room details
const chatRoom = computed(
    () => chatStore.rooms[chatStore.activeChat ?? '']
) ?? { name: '' };

function generateConnectionId(user1: string, user2: string): string {
    return [user1, user2].sort().join('-');
}

function selectChat(contactAddress: string) {
    chatStore.setActiveChat(contactAddress, userAddress.value);
}

function sendMessage() {
    const peerData = peerConnections.get(chatStore?.activeChat ?? '');
    if (!peerData || !peerData.peerConnection) {
        console.error(
            '❌ No active WebRTC connection with',
            chatStore?.activeChat
        );
        return;
    }
    const chatChannel = peerData.chatChannel;
    console.log(
        '🔍 Chat channel state:',
        chatChannel?.readyState,
        'Channel:',
        chatChannel
    ); // Debug log
    if (chatChannel?.readyState === 'open') {
        console.log('📤 Sending message:', newMessage.value);
        chatChannel.send(newMessage.value);
        if (!newMessage.value.trim() || !chatStore.activeChat) return;
        chatStore.addMessage(
            chatStore.activeChat,
            userAddress.value,
            newMessage.value
        );
        newMessage.value = '';
    } else {
        console.error(
            '❌ Chat channel is not open, state:',
            chatChannel?.readyState
        );
    }
}
// Format the timestamp to a local time string
function formatTimestamp(timestamp: Date) {
    return new Date(timestamp).toLocaleTimeString();
}

async function startWebRTC(contact: string) {
    const connectionId = generateConnectionId(userAddress.value, contact);
    if (!connectionId) return;
    const peerConnection = createPeerConnection(connectionId, true);
    if (!peerConnection) return;
}

function createPeerConnection(
    connectionId: string,
    initiator: boolean = true
): RTCPeerConnection {
    let peerConnection: RTCPeerConnection;
    if (!peerConnections.has(connectionId)) {
        peerConnection = new RTCPeerConnection(iceconfig);
        console.log(`🔵 Creating PeerConnection for ${connectionId}`);

        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                console.log(`✅ ICE Candidate:`, event.candidate);
                socket?.emit('webrtcSignal', {
                    connectionId: connectionId,
                    data: { candidate: event.candidate },
                });
            } else {
                console.log('⚠️ No more ICE candidates.');
            }
        };

        peerConnection.oniceconnectionstatechange = () => {
            console.log(
                `🔄 ICE Connection State: ${peerConnection.iceConnectionState}`
            );
            if (peerConnection.iceConnectionState === 'failed') {
                console.log('🔄 Attempting ICE Restart...');
                peerConnection
                    .createOffer({ iceRestart: true })
                    .then((offer) => {
                        peerConnection.setLocalDescription(offer);
                        socket?.emit('webrtcSignal', {
                            connectionId: connectionId,
                            data: { sdp: offer },
                        });
                    });
            }
        };

        peerConnection.onconnectionstatechange = () => {
            console.log(
                `🔄 Peer Connection State: ${peerConnection.connectionState}`
            );
            if (peerConnection.connectionState === 'connected') {
                console.log(
                    `🎉 WebRTC Connection Established with ${connectionId}`
                );
            } else if (peerConnection.connectionState === 'disconnected') {
                console.log(`⚠️ WebRTC Disconnected from ${connectionId}`);
            }
        };

        peerConnection.onsignalingstatechange = () => {
            console.log(
                `📡 Signaling State Changed: ${peerConnection.signalingState}`
            );
        };

        peerConnection.onicecandidateerror = (event) => {
            console.error('❌ ICE Candidate Error', event);
        };

        let chatChannel: RTCDataChannel | null = null;

        if (initiator) {
            // 🟢 Initiator creates Data Channel
            chatChannel = peerConnection.createDataChannel(
                'chat-' + connectionId
            );
            setupDataChannelEvents(chatChannel);

            peerConnection.onnegotiationneeded = async () => {
                const offer = await peerConnection?.createOffer();
                await peerConnection?.setLocalDescription(offer);
                chatRequests.value.push({
                    connectionId: connectionId,
                    from: address.value ?? '',
                    data: { sdp: offer },
                    offer: offer,
                    state: 'accepted',
                });
                socket?.emit('webrtcSignal', {
                    connectionId: connectionId,
                    data: { sdp: offer },
                });
            };
        } else {
            if (!peerConnections.get(connectionId)?.chatChannel) {
                console.log('🟢 Creating Data Channel for remote peer!');

                peerConnection.ondatachannel = (event) => {
                    console.log('📡 Data Channel Received from remote peer!');
                    const receivedChannel = event.channel;
                    setupDataChannelEvents(receivedChannel);
                    peerConnections.set(connectionId, {
                        peerConnection,
                        chatChannel: receivedChannel,
                    });
                };
            }
        }

        peerConnections.set(connectionId, { peerConnection, chatChannel });
    } else {
        // send offer again
        if (initiator) {
            peerConnection = peerConnections.get(connectionId)!.peerConnection;
            peerConnection.createOffer().then((offer) => {
                peerConnection.setLocalDescription(offer);
                socket?.emit('webrtcSignal', {
                    connectionId: connectionId,
                    data: { sdp: offer },
                });
            });
        }
    }
    return peerConnections.get(connectionId)!.peerConnection;
}

function setupDataChannelEvents(chatChannel: RTCDataChannel) {
    chatChannel.onopen = () => console.log('🟢 Chat Channel Opened!');
    chatChannel.onmessage = (event) => {
        console.log('📩 Message received:', event.data);
        const chatId = chatChannel.label.replace('chat-', '');
        const senderAddress = chatId
            .replace(userAddress.value, '')
            .replace('-', '');
        chatStore.addMessage(chatId, senderAddress, event.data);
    };
    chatChannel.onclose = () => console.log('🔴 Chat Channel Closed!');
}

onMounted(() => {
    const addr = toValue(userAddress);
    if (addr && !socket) {
        socket = $createSocketConnection(addr);
        socket.on('onlineUsers', (payload) => {
            onlineUsers.value = payload.filter(
                (user: string) => user !== userAddress.value
            );
        });
        socket.on('chatResponse', ({ from, state }) => {
            if (state === 'accepted') {
                console.log('Chat request accepted', from);
            } else {
                // remove request from chatRequests
                const connectionId = generateConnectionId(
                    userAddress.value,
                    from
                );
                const peerConnection =
                    peerConnections.get(connectionId)!.peerConnection;
                peerConnection.close();
                peerConnections.delete(connectionId);
                chatRequests.value = chatRequests.value.filter(
                    (request) => request.connectionId !== connectionId
                );
            }
        });
        socket.on('webrtcSignal', async ({ from, data }) => {
            const connectionId = generateConnectionId(userAddress.value, from);
            if (!connectionId) return;
            const chatRequest = chatRequests.value.find(
                (request) => request.connectionId === connectionId
            );
            if (chatRequest && chatRequest.state === 'accepted') {
                console.log('Chat request accepted', from);
                const peerConnection = createPeerConnection(
                    connectionId,
                    false
                );
                if (!peerConnection) return;

                if (data.sdp) {
                    await peerConnection.setRemoteDescription(
                        new RTCSessionDescription(data.sdp)
                    );
                    if (data.sdp.type === 'offer') {
                        const answer = await peerConnection.createAnswer();
                        await peerConnection.setLocalDescription(answer);
                        socket?.emit('webrtcSignal', {
                            connectionId: connectionId,
                            data: { sdp: answer },
                        });
                    }
                }
                if (data.candidate) {
                    console.log('✅ Received ICE Candidate:', data.candidate);
                    await peerConnection.addIceCandidate(
                        new RTCIceCandidate(data.candidate)
                    );
                }
            } else if (!chatRequest) {
                chatRequests.value.push({
                    connectionId: connectionId,
                    data: data,
                    from: from,
                    offer: data.sdp,
                    state: 'pending',
                });
                useEvent('chat:request', { from, to: userAddress.value });
                return;
            } else {
                console.log('❌ Chat else');

                return;
            }
        });
    }
});
onBeforeUnmount(() => {
    socket?.disconnect();
});

async function requestChat(contact: string) {
    await startWebRTC(contact);
}

async function acceptChat(chatroom: string) {
    const chatRequest = chatRequests?.value?.find(
        (request) => request.from === chatroom
    );

    if (chatRequest && chatRequest.state === 'pending') {
        createPeerConnection(chatRequest.connectionId, false);
        const peerConnection = peerConnections.get(
            chatRequest.connectionId
        )!.peerConnection;
        await peerConnection.setRemoteDescription(
            new RTCSessionDescription(chatRequest.data.sdp)
        );
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);

        socket?.emit('webrtcSignal', {
            connectionId: chatRequest.connectionId,
            data: { sdp: answer },
        });
        chatRequest.state = 'accepted';
        chatStore.setActiveChat(chatroom, userAddress.value);
    }
}

function rejectChat(chatroom: string) {
    if (chatRequests?.value?.some((request) => request.from === chatroom)) {
        socket?.emit('chatResponse', {
            from: toValue(userAddress),
            to: chatroom,
            state: 'rejected',
        });
        // remove request from chatRequests
        chatRequests.value = chatRequests.value.filter(
            (request) => request.from !== chatroom
        );
    }
}
</script>
