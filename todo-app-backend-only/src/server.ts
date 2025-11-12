import { Hono, type Context } from 'hono';
import { cors } from 'hono/cors';

import { serve } from '@hono/node-server';

import { addTodo, getTodos, updateTodo, deleteTodo } from './todo.js';

const app = new Hono()
app.use(cors({ origin: "*" }))
app.onError(async (err: Error, c: Context) => {
    const errorStack = err.stack?.split("\n")
    return c.json({ error: { message: "Server Error", errorStack, code: "SERVER_ERROR" } }, 500)
})

app.get("/api/todos", getTodos)
    .post("/api/todo/create", addTodo)
    .put("/api/todo/update/:id", updateTodo)
    .delete("/api/todo/delete/:id", deleteTodo)

app.notFound(c => c.json({ message: "Not Found", code: "NOT_FOUND" }, 404))
serve({ fetch: app.fetch, port: Number(process.env['SERVER_PORT'] || 3000) }, (info) => {
    console.info(`Server is running on http://localhost:${info.port}`)
})