import type { Context } from "hono";
import { prisma } from "../../prisma/prisma.extended.js";

type UpdateTodoParams = {
    title: string, notes?: string
}
export const updateTodo = async (c: Context) => {
    const id = c.req.param("id")
    const { title, notes } = await c.req.json<UpdateTodoParams>()

    if (!id || typeof id !== "string") return c.json({ error: "Todo id must be provided to update." }, 400)
    if (!title || typeof title !== "string") return c.json({ error: "Title is required. Please try to fill it up." }, 400)

    if (notes && typeof notes !== "string") return c.json({ error: "Invalid notes type." }, 400)
    if (notes && notes.trim().length >= 150) return c.json({ error: "Notes must be less than or equal 150 characters." }, 400)

    try {
        await prisma.todos.update({ where: { id }, data: { title, notes: notes ?? null } })
        return c.json({ message: "Todo updated successfully" }, 200)

    } catch (err) {
        console.error("Error: ", err)
        return c.json({ error: "Unable to update todos." }, 400)
    }

}