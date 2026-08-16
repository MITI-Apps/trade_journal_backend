import express from "express";
const router = express.Router();
import { registerUser, loginUser, getMe } from '../controllers/auth.controller.js';
import validate from "../middleware/validate.js";
import {createUserSchema, loginUserSchema} from "../validators/auth.validator.js"
import authJwt from "../middleware/auth.middleware.js";

router.post('/register',validate(createUserSchema), registerUser);

router.post('/login',validate(loginUserSchema), loginUser);

router.get('/me', authJwt, getMe);

export default router;