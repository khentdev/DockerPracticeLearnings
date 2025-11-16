import type { Context } from "hono";
import { prisma } from "../../prisma/prisma.extended.js";

type AddTodoParams = {
    title: string, notes?: string
}
export const addTodo = async (c: Context) => {
    const { title, notes } = await c.req.json<AddTodoParams>()

    if (!title || typeof title !== "string") return c.json({ error: "Title is required. Please try to fill it up." }, 400)

    if (notes && typeof notes !== "string") return c.json({ error: "Invalid notes type." }, 400)
    if (notes && notes.trim().length >= 150) return c.json({ error: "Notes must be less than or equal 150 characters." }, 400)

    try {
        await prisma.todos.create({ data: { title, notes: notes ?? null } })
        return c.json({ message: "Todo added successfully" }, 201)
    } catch (err) {
        console.error("Error: ", err)
        return c.json({ error: "Unable to add todos." }, 400)
    }

}