import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();

router.post("/", UserController.createUser);
router.get("/", UserController.getAllUsers);
router.put("/:userId", UserController.updateOneUser);
router.delete("/:userId", UserController.deleteOneUser);
router.put("/:userId/orders", UserController.updateOneOrder);
router.get("/:userId/orders", UserController.getOneOrder);
router.get("/:userId/orders/total-price", UserController.getOneTotalPrice);
export const UserRoutes = router;
