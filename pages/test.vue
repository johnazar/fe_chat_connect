<template>
    <div class="mx-auto flex w-full max-w-7xl justify-center p-4">
        <div>
            <button @click="joinRoom">Join Room</button>
            <button @click="sendSignal">Send Signal</button>
        </div>
    </div>
</template>
<script setup lang="ts">
const { $socket } = useNuxtApp();

// Example: join a room
function joinRoom() {
    const roomId = 'example-room';
    $socket.emit('join', roomId);
    console.log(`Joined room ${roomId}`);
}

// Example: send a dummy signal message
function sendSignal() {
    const payload = {
        room: 'example-room',
        data: { type: 'offer', sdp: 'dummy sdp data' },
    };
    $socket.emit('signal', payload);
    console.log('Signal sent:', payload);
}
</script>
