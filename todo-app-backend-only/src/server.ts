import 'dotenv/config';

import { serve } from '@hono/node-server';

import { prisma } from '../prisma/prisma.extended.js';
import { createApp } from './createApp.js';
import { env } from 'process';

const app = createApp()
const shutdown = async (signal: string) => {
    console.info(`${signal} received: shutting down gracefully...`);
    try { await prisma.$disconnect(); } catch (err) { console.error('Error during prisma disconnect', err); }
    process.exit(0);
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.once('SIGUSR2', () => shutdown('SIGUSR2'));
process.on('unhandledRejection', (reason) => { console.error({ reason }, 'Unhandled promise rejection'); shutdown('UNHANDLED_REJECTION'); });
process.on('uncaughtException', (err) => { console.error({ err }, 'Uncaught exception'); shutdown('UNCAUGHT_EXCEPTION'); });
const envPort = env['SERVER_PORT'] ? parseInt(env['SERVER_PORT'], 10) : null;

const port = (envPort && !isNaN(envPort) && envPort > 0 && envPort < 65536) ? envPort : 3000;
serve({ fetch: app.fetch, port }, (info) => {
    const NODE_ENV = env['NODE_ENV'] ?? "development"
    console.info(`Server is running on http://localhost:${info.port}: Running in ${NODE_ENV} mode.`)
})