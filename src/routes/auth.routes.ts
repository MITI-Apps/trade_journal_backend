import express from "express";
const router = express.Router();
import { registerUser, loginUser, getMe, updateProfile } from '../controllers/auth.controller.js';
import validate from "../middleware/validate.js";
import {createUserSchema, loginUserSchema, updateProfileSchema} from "../validators/auth.validator.js"
import authJwt from "../middleware/auth.middleware.js";

router.post('/register',validate(createUserSchema), registerUser);

router.post('/login',validate(loginUserSchema), loginUser);

// Protected routes
router.get('/me', authJwt, getMe);
router.put('/update-profile', authJwt, validate(updateProfileSchema), updateProfile);


export default router;