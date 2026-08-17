import { Router } from 'express';
import { createTradingAccount } from '../controllers/tradingAccount.controller.js';
import { createTradingAccountSchema } from '../validators/tradingAccount.validator.js';
import validate from "../middleware/validate.js";
import  authJwt  from '../middleware/auth.middleware.js';

const router = Router();

// All trading account routes require authentication
router.use(authJwt);

router.post('/', validate(createTradingAccountSchema), createTradingAccount);

export default router;