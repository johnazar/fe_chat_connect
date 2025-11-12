// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-11-05',
    devtools: { enabled: true },
    css: ['~/assets/css/main.css'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    modules: [
        '@pinia/nuxt',
        'pinia-plugin-persistedstate/nuxt',
        '@nuxt/eslint',
        '@wagmi/vue/nuxt',
        '@nuxtjs/i18n',
        '@nuxtjs/tailwindcss',
        '@nuxtjs/color-mode',
    ],
    runtimeConfig: {
        public: {
            signalingWsUrl: '',
        },
    },
    colorMode: {
        classSuffix: '',
    },
    i18n: {
        lazy: true,
        defaultLocale: 'en',
        strategy: 'prefix_except_default',
        langDir: '../locales',
        locales: [
            { code: 'en', iso: 'en-US', name: 'English', file: 'en-US.json' },
            { code: 'fr', iso: 'fr-FR', name: 'Français', file: 'fr-FR.json' },
        ],
    },
});
