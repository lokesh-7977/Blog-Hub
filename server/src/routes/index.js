import { Router } from "express";
import UserRoute from "./user.route.js";
import PostsRoute from "./posts.route.js";
import ComentsRoute from './coments.route.js'
import Auth from "../middleware/user.middleware.js";

const router = Router();

router.use("/",UserRoute);
router.use("/", PostsRoute);
router.use("/",Auth,ComentsRoute);

export default router;