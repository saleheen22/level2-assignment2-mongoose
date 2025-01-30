import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();

router.post("/", UserController.createUser);
router.get("/", UserController.getAllUsers);
router.put("/:userId", UserController.updateOneUser);
router.delete('/:userId', UserController.deleteOneUser)
export const UserRoutes = router;
