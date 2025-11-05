// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';
import eslintPluginPrettier from 'eslint-plugin-prettier'

export default withNuxt(
    // Your custom configs here
    [
        {
            files: ['**/*.{js,ts,vue}'],
            plugins: {
                prettier: eslintPluginPrettier,
            },
            rules: {
                'prettier/prettier': 'error',
                "vue/html-self-closing": "off",
            },
        },
    ]
);
