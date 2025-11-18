import { serve } from '@hono/node-server';
import { createApp } from './createApp.js';
import { config } from './config/env.js';
import { registerShutdownHandlers } from './utils/shutdown.js';

const app = createApp();

registerShutdownHandlers();

serve({ fetch: app.fetch, port: config.PORT }, (info) => {
    console.info(`Server is running on http://localhost:${info.port}: Running in ${config.NODE_ENV} mode.`);
});