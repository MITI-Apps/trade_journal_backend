import express from "express";
const router = express.Router();
import { registerUser } from '../controllers/auth.controller.js';
import validate from "../middleware/validate.js";
import {createUserSchema} from "../validators/auth.validator.js"

router.post('/register',validate(createUserSchema), registerUser);

export default router;