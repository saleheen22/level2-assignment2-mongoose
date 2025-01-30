import express, { Application, Request, Response } from "express";
import cors from "cors";
import { UserRoutes } from "./app/modules/users/user.routes";
const app: Application = express();
// const port = 3000

//parsers
app.use(express.json());
app.use(cors());
// routes
app.use("/api/users", UserRoutes);

export default app;
