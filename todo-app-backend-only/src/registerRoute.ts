import { Hono } from 'hono';

import todoRoutes from './controller/routes.js';

export const registerRoutes = (app: Hono) => {
    app.get("/", (c) => c.redirect("/health-ping", 301));
    app.get("/health-ping", (c) => c.json({ status: "ok" }, 200));
    app.route("/api", todoRoutes)
}