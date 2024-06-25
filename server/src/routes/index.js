import { Router } from "express";
import PostsRoute from "./posts.route.js";

const router = Router();

router.use("/", PostsRoute);

export default router;