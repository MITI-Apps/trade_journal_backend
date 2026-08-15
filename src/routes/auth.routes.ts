import express from "express";
const router = express.Router();
import { registerUser, loginUser } from '../controllers/auth.controller.js';
import validate from "../middleware/validate.js";
import {createUserSchema, loginUserSchema} from "../validators/auth.validator.js"

router.post('/register',validate(createUserSchema), registerUser);

router.post('/login',validate(loginUserSchema), loginUser);

export default router;