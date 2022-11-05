import { FastifyInstance } from "fastify";
import ShortUniqueId from "short-unique-id";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function poolRoutes(fastify: FastifyInstance) {
  fastify.get("/pools", async () => {
    const pools = await prisma.pool.findMany({
      orderBy: { createdAt: "asc" },
    });

    return { pools };
  });

  fastify.post("/pools", async (request, response) => {
    const createPoolBody = z.object({
      title: z.string(),
    });
    const { title } = createPoolBody.parse(request.body);

    const generate = new ShortUniqueId({ length: 6 });
    const code = String(generate()).toUpperCase();

    const pool = await prisma.pool.create({
      data: {
        title,
        code,
      },
    });

    return response.status(201).send({ pool });
  });

  fastify.get("/pools/count", async () => {
    const count = await prisma.pool.count();

    return { count };
  });
}
