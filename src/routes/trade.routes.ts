import { Router } from 'express';
import { createTrade, getTrades, getTradeById } from '../controllers/trade.controller.js';
import { createTradeSchema, getTradesQuerySchema, tradeIdParamSchema } from '../validators/trade.validator.js';
import { validate, validateQuery, validateParams } from '../middleware/validate.js';
import  authJwt  from '../middleware/auth.middleware.js';

const router = Router();

router.use(authJwt);

router.post('/', validate(createTradeSchema), createTrade);

router.get('/', validateQuery(getTradesQuerySchema), getTrades);

router.get('/:id', validateParams(tradeIdParamSchema), getTradeById)

export default router;