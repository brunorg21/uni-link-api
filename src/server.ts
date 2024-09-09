import fastify from "fastify";
import cors from "@fastify/cors";
import { authRoutes } from "./http/controllers/auth/routes";
import fastifyJwt from "@fastify/jwt";
import { classroomRoutes } from "./http/controllers/classrooms/routes";
import { userRoutes } from "./http/controllers/users/routes";

const app = fastify();

app.register(cors, {
  origin: "*",
});

app.register(fastifyJwt, {
  secret: process.env.SECRET_KEY!,
});

app.register(authRoutes);

app.register(classroomRoutes);
app.register(userRoutes);

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("🤖🤖🤖 Server running...");
  });
