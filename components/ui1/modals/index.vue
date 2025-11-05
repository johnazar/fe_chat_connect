<template>
    <!-- Main modal -->
    <div
        v-if="show"
        :id="modalId"
        tabindex="-1"
        aria-hidden="true"
        class="fixed left-0 right-0 top-0 z-50 h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden md:inset-0"
    >
        <div
            ref="ModalWindow"
            class="relative mx-auto flex max-h-full min-h-screen w-full max-w-2xl items-center justify-center p-4"
        >
            <!-- Modal content -->
            <div
                class="relative rounded-lg bg-white shadow-sm dark:bg-gray-700"
            >
                <!-- Modal header -->
                <slot name="header"></slot>
                <!-- Modal body -->
                <slot></slot>
                <!-- Modal footer -->
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
// const emit = defineEmits(['close']);
defineProps({
    modalId: {
        type: String,
        default: 'default-modal',
    },
    show: {
        type: Boolean,
        default: false,
    },
    sticky: {
        type: Boolean,
        default: false,
    },
});
const ModalWindow = ref<HTMLElement | null>(null);
</script>
