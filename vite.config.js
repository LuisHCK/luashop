import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'url'
import react from '@vitejs/plugin-react'
import express from './express-plugin'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [express('src/server'), react()],
    server: {
        watch: {
            usePolling: true
        },
        host: true,
        strictPort: true,
        port: 8080
    },
    resolve: {
        alias: [{ find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) }]
    }
})
