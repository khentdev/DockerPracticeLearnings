
import type { Context } from "hono"
import { prisma } from "../../prisma/prisma.extended.js"


export const getTodos = async (c: Context) => {
    try {
        const res = await prisma.todos.findMany({ select: { id: true, title: true, notes: true, createdAt: true } })
        return c.json({
            message: "Todos successfully fetched.", todos: res
        })
    } catch (err) {
        console.error("Error on getTodos: ", err)
        return c.json({ message: "Unable to fetch todos." }, 400)
    }
}