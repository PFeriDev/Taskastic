/* import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  if (req.method === "GET") {
    // Minden Todo lekérése
    const todos = await prisma.todo.findMany();
    res.status(200).json(todos);
  } else if (req.method === "POST") {
    // Új Todo hozzáadása
    const { title, description } = req.body;
    const newTodo = await prisma.todo.create({
      data: { title, description },
    });
    res.status(201).json(newTodo);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  const { id } = req.query; // Az ID-t az URL-ből kapjuk

  if (req.method === "GET") {
    // Todo lista lekérése
    const todos = await prisma.todo.findMany();
    res.status(200).json(todos);
  } else if (req.method === "POST") {
    // Új Todo hozzáadása
    const { title, description } = req.body;
    const newTodo = await prisma.todo.create({
      data: { title, description },
    });
    res.status(201).json(newTodo);
  } else if (req.method === "PUT") {
    // Todo frissítése
    const { completed } = req.body;
    const updatedTodo = await prisma.todo.update({
      where: { id: Number(id) },
      data: { completed },
    });
    res.status(200).json(updatedTodo);
  } else if (req.method === "DELETE") {
    // Todo törlése
    await prisma.todo.delete({
      where: { id: Number(id) },
    });
    res.status(204).end(); // 204: No Content
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
