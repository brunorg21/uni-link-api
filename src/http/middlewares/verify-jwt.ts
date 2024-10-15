import { FastifyReply, FastifyRequest } from "fastify";

export async function verifyJwt(req: FastifyRequest, reply: FastifyReply) {
  try {
    await req.jwtVerify();
  } catch (err) {
    console.log("auth error", err);

    reply.send(err);
  }
}
