import type { Context } from "hono";
import { prisma } from '../../prisma/prisma.extended.js';

type AddTodoParams = {
    title: string, notes?: string
}
export const addTodo = async (c: Context) => {
    const { title, notes } = await c.req.json<AddTodoParams>()

    if (!title || typeof title !== "string") return c.json({ message: "Title is required." }, 400)
    if (title && title.trim().length > 100) return c.json({ message: "Title must be less than or equal to 100 characters." }, 400)

    if (notes && typeof notes !== "string") return c.json({ message: "Type of notes must be a typeof string." }, 400)
    if (notes && notes.trim().length >= 150) return c.json({ message: "Notes must be less than or equal 150 characters." }, 400)

    try {
        await prisma.todos.create({ data: { title, notes: notes ?? null } })
        return c.json({ message: "Todo added successfully" }, 201)
    } catch (err) {
        console.error("Error on addTodo: ", err)
        return c.json({ message: "Unable to add todos." }, 400)
    }
}