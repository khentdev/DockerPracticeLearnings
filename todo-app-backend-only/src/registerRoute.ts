import { Hono } from 'hono';

import todoRoutes from './route.js';

export const registerRoutes = (app: Hono) => {
    app.get("/", (c) => c.redirect("/health-ping"));
    app.get("/health-ping", (c) => c.json({ status: "ok" }, 200));
    app.route("/api", todoRoutes)
}