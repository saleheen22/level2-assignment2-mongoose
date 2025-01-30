import { Request, Response } from "express";
import { userSchemaValidation } from "./user.validation";
import { createUserIntoDB } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: UserData } = req.body;

    // validation using zod
    const zodParsedData = userSchemaValidation.parse(UserData);
    const result = await createUserIntoDB(UserData);
    res.status(200).json({
      success: true,
      message: "User is created is successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: true,
      message: error.message || "something is wrong",
      error: error,
    });
  }
};

export const UserController = {
  createUser,
};
