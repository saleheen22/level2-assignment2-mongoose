import { Request, Response } from "express";
import { userSchemaValidation } from "./user.validation";

const createUser = async(req: Request, res: Response)=> {
    try{
        const {user: UserData} = req.body;

        // validation using zod
        const zodParsedData = userSchemaValidation.parse(UserData);
        const result = await 
    }
}