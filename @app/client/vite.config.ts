import { defineConfig } from "vite";

export default defineConfig({
    server: {
        host: true,
        watch: {
            usePolling: true,
            ignored: ['**/node_modules/**', '**/.git/**', '**/dist/**'],
        }
    }
});