import express, { Application, Request, Response } from "express";
import cors from "cors";
import { UserRoutes } from "./app/modules/users/user.routes";
const app: Application = express();


//parsers
app.use(express.json());
app.use(cors());
// routes
app.use("/api/users", UserRoutes);
const getAController = (req: Request, res: Response) :void=>{
    res.status(200).json({
        success: true,
        message: 'Welcome to the API of level-2 assignment2'
    })
}
app.get('/', getAController)

export default app;
