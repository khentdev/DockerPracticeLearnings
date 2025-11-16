
import type { Context } from "hono"
import { prisma } from "../../prisma/prisma.extended.js"

export const getTodos = async (c: Context) => {
    try {
        const res = await prisma.todos.findMany()
        return c.json({ message: "Todos successfully fetched.", todos: res }, 200)
    } catch (err) {
        console.error("Error: ", err)
        return c.json({ error: "Unable to fetch todos." }, 400)
    }
}