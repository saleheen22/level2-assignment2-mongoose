/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, RequestHandler, Response } from "express";
import { userSchemaValidation } from "./user.validation";
import {
  createUserIntoDB,
  deleteOneUserFromDB,
  getAllUsersFromDB,
  getOneOrderFromDB,
  getOneTotalPriceFromDB,
  updateOneOrderFromDB,
  updateOneUserFromDB,
} from "./user.service";

const createUser: RequestHandler = async (req: Request, res: Response) => {
  try {
    const UserData = req.body;

    // validation using zod
    const zodParsedData = userSchemaValidation.parse(UserData);
    const result = await createUserIntoDB(zodParsedData);
    res.status(200).json({
      success: true,
      message: "User is created is successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error || "something is wrong",
      error: error,
    });
  }
};
const getAllUsers: RequestHandler = async (req: Request, res: Response) => {
  try {
    const result = await getAllUsersFromDB();
    res.status(200).json({
      success: true,
      message: "Users are retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
const updateOneUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const parsedUserId = parseInt(userId, 10);

    if (isNaN(parsedUserId)) {
      res.status(400).json({ error: "Invalid userId parameter." });
    }

    const userData = req.body;

    // Validate input using Zod
    const zodParsedData = userSchemaValidation.parse(userData);

    // Update user in the database
    const result = await updateOneUserFromDB(parsedUserId, zodParsedData);

    // Respond with success
    res.status(200).json({
      success: true,
      message: "User updated successfully.",
      data: result,
    });
  } catch (error) {
    // Handle validation or service errors
    res.status(500).json({
      success: false,
      message: error || "An unexpected error occurred.",
    });
  }
};
const deleteOneUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const parsedUserId = parseInt(userId, 10);

    if (isNaN(parsedUserId)) {
      res.status(400).json({ error: "Invalid userId parameter." });
    }

    // Update user in the database
    await deleteOneUserFromDB(parsedUserId);

    // Respond with success
    res.status(200).json({
      success: true,
      message: "User deleted successfully.",
      data: null,
    });
  } catch (error) {
    // Handle validation or service errors
    res.status(500).json({
      success: false,
      message: error || "User can't be deleted.",
    });
  }
};
const updateOneOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const parsedUserId = parseInt(userId, 10);

    if (isNaN(parsedUserId)) {
      res.status(400).json({ error: "Invalid userId parameter." });
    }
    const orderData = req.body;
    const result = await updateOneOrderFromDB(parsedUserId, orderData);

    res.status(200).json({
      success: true,
      message: "Order created successfully.",
      data: null,
    });
  } catch (error) {
    // Handle validation or service errors
    res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to create order.",
    });
  }
};
const getOneOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const parsedUserId = parseInt(userId, 10);
    if (isNaN(parsedUserId)) {
      res.status(400).json({ error: "Invalid userId parameter." });
    }
    const result = await getOneOrderFromDB(parsedUserId);
    res.status(200).json({
      success: true,
      message: "Order fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to get the error",
    });
  }
};
const getOneTotalPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const parsedUserId = parseInt(userId, 10);
    if (isNaN(parsedUserId)) {
      res.status(400).json({ error: "Invalid userId parameter." });
    }
    const result = await getOneTotalPriceFromDB(parsedUserId);
    res.status(200).json({
      success: true,
      message: "Total price calculated successfully!",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to get the error",
    });
  }
};
export const UserController = {
  createUser,
  getAllUsers,
  updateOneUser,
  deleteOneUser,
  updateOneOrder,
  getOneOrder,
  getOneTotalPrice,
};
