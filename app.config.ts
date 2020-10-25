require('dotenv').config();

export default {
    name: 'Charegeports-App',
    slug: 'Chargeports-App',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './src/assets/icon.png',
    splash: {
        image: './src/assets/splash.png',
        resizeMode: 'contain',
        backgroundColor: '#ffffff'
    },
    updates: {
        fallbackToCacheTimeout: 0
    },
    packagerOpts: {
        config: "metro.config.js",
        sourceExts: [
            "expo.ts",
            "expo.tsx",
            "expo.js",
            "expo.jsx",
            "ts",
            "tsx",
            "js",
            "jsx",
            "json",
            "wasm",
            "svg"
        ]
    },
    assetBundlePatterns: [
        '**/*'
    ],
    ios: {
        bundleIdentifier: 'nl.chargeports.app',
        usesAppleSignIn: true
    },
    web: {
        favicon: './src/assets/icon.png'
    },
    description: '',
    extra: {
        apiUrl: process.env.EXPO_API_BASE_URL || 'http://localhost',
        hereApiKey: process.env.HERE_API_KEY || '1234',
    }
};
