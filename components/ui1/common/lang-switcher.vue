<template>
    <div class="flex">
        <select
            id="lang-selector"
            v-model="selectedLocale"
            class="dark:bg-gray-800 dark:text-white"
            @change="changeLocale"
        >
            <option
                v-for="mylocale in availableLocales"
                :key="mylocale.code"
                :value="mylocale.code"
            >
                {{ mylocale.name }}
            </option>
        </select>
    </div>
</template>
<script setup>
const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const selectedLocale = ref(locale.value);
const availableLocales = computed(() => {
    return locales.value.filter(() => locale.value);
});

const router = useRouter();

const changeLocale = () => {
    const path = switchLocalePath(selectedLocale.value);
    if (path) {
        router.push(path);
    }
};
</script>
