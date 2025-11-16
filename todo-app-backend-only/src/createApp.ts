
import { Hono } from 'hono';
import { cors } from 'hono/cors';

import { registerRoutes } from './registerRoute.js';

import type { Context } from 'hono';
export const createApp = () => {
    const app = new Hono()
    app.use(cors({ origin: "*" }))

    app.onError((err: Error, c: Context) => {
        console.error("Server Error:", { errorStack: err.stack?.trim().split("\n") })
        return c.json({ error: { message: "Server Error", code: "SERVER_ERROR" } }, 500)
    })
    app.notFound(c => c.json({ message: "Not Found", code: "NOT_FOUND" }, 404))
    registerRoutes(app)

    return app
}