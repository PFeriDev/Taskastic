import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  if (req.method === "GET") {
    // Minden Todo lekérése
    const todos = await prisma.todo.findMany();
    res.status(200).json(todos);
  } else if (req.method === "POST") {
    // Új Todo hozzáadása
    const { title } = req.body;
    const newTodo = await prisma.todo.create({
      data: { title },
    });
    res.status(201).json(newTodo);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
