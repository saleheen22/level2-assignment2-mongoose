import { Request, Response } from "express";
import { userSchemaValidation } from "./user.validation";
import { createUserIntoDB, deleteOneUserFromDB, getAllUsersFromDB, updateOneUserFromDB } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: UserData } = req.body;

    // validation using zod
    const zodParsedData = userSchemaValidation.parse(UserData);
    const result = await createUserIntoDB(zodParsedData);
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
const getAllUsers = async(req: Request, res: Response)=> {
    try{
        const result = await getAllUsersFromDB();
        res.status(200).json({
            success: true,
            message: 'Users are retrieved successfully',
            data: result
        })
    } catch(error){
        console.log(error);
    }
}
const updateOneUser = async(req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const parsedUserId = parseInt(userId, 10);

    if (isNaN(parsedUserId)) {
      return res.status(400).json({ error: "Invalid userId parameter." });
    }

    const { user: userData } = req.body;

    // Validate input using Zod
    const zodParsedData = userSchemaValidation.parse(userData);

    // Update user in the database
    const result = await updateOneUserFromDB(parsedUserId, zodParsedData);

    // Respond with success
    return res.status(200).json({
      success: true,
      message: "User updated successfully.",
      data: result,
    });
  } catch (error: any) {
    // Handle validation or service errors
    return res.status(500).json({
      success: false,
      message: error.message || "An unexpected error occurred.",
    });
  }
}
const deleteOneUser = async(req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const parsedUserId = parseInt(userId, 10);

    if (isNaN(parsedUserId)) {
      return res.status(400).json({ error: "Invalid userId parameter." });
    }

    

 

    // Update user in the database
    const result = await deleteOneUserFromDB(parsedUserId);

    // Respond with success
    return res.status(200).json({
      success: true,
      message: "User deleted successfully.",
      data: null,
    });
  } catch (error: any) {
    // Handle validation or service errors
    return res.status(500).json({
      message: "User not found",
    error: {
        "code": 404,
        "description": "User not found!"
    }
    });
  }
}
export const UserController = {
  createUser,
  getAllUsers,
  updateOneUser,
  deleteOneUser
};
