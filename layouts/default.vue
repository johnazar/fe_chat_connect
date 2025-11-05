<template>
    <div
        class="grid h-screen grid-rows-[auto,1fr,auto] dark:bg-gray-800 dark:text-white"
    >
        <LazyUi1ModalsConnect />

        <Ui1LayoutHeader />
        <slot />
        <Ui1LayoutFooter />
        <Ui1CommonToast />
    </div>
</template>
<script setup lang="ts">
import { Ui1LayoutFooter, Ui1LayoutHeader } from '#components';
</script>
