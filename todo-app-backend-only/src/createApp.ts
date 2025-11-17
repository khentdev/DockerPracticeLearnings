import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { registerRoutes } from './registerRoute.js';

export const createApp = () => {
    const app = new Hono();

    app.use(cors({ origin: "*" }));

    app.onError((err, c) => {
        console.error('Error:', err);
        return c.json({
            message: err.message || 'Internal server error',
            error: process.env['NODE_ENV'] === "development" ? err.stack : undefined
        }, 500);
    });
    app.notFound((c) => {
        return c.json({ message: 'Route not found' }, 404);
    });
    registerRoutes(app)
    return app;
};