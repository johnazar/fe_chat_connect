<template>
    <button
        class="bg-background text-text rounded-full p-2"
        @click="toggleTheme"
    >
        {{ colorMode.value === 'dark' ? '🌞' : '🌙' }}
    </button>
</template>
<script setup>
const colorMode = useColorMode();

const toggleTheme = () => {
    useEvent('toast', {
        text: `Switching to ${
            colorMode.value === 'dark' ? 'light' : 'dark'
        } mode.`,
        type: 'success',
    });
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
};
</script>
