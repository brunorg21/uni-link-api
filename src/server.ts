import fastify from "fastify";
import cors from "@fastify/cors";
import { authRoutes } from "./http/controllers/auth/routes";
import fastifyJwt from "@fastify/jwt";
import { classroomRoutes } from "./http/controllers/classrooms/routes";
import { userRoutes } from "./http/controllers/users/routes";
import { subjectRoutes } from "./http/controllers/subject/routes";
import { classSchedulesRoutes } from "./http/controllers/classSchedule/routes";
import { alocationRoutes } from "./http/controllers/alocation/routes";
import { courseRoutes } from "./http/controllers/course/routes";

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
app.register(subjectRoutes);
app.register(classSchedulesRoutes);
app.register(alocationRoutes);
app.register(courseRoutes);

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("🤖🤖🤖 Server running...");
  })
  .catch((err) => {
    console.log(err);
  });
