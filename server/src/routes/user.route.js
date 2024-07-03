import { register , login, logout ,getUser , updateUser } from "../controllers/user.controller.js";
import { Router } from "express";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user/:id", getUser);
router.patch("/user/:id", updateUser);
router.get("/logout", logout);

export default router;