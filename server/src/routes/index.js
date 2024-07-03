import { Router } from "express";
import UserRoute from "./user.route.js";
import PostsRoute from "./posts.route.js";
import ComentsRoute from './coments.route.js'

const router = Router();

router.use("/",UserRoute);
router.use("/", PostsRoute);
router.use("/",ComentsRoute);

export default router;