import { Router } from "express";
import PostsRoute from "./posts.route.js";
import ComentsRoute from './coments.route.js'

const router = Router();

router.use("/", PostsRoute);
router.use("/",ComentsRoute);

export default router;