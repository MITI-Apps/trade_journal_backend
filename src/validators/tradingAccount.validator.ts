import Joi from 'joi';

const createTradingAccountSchema = Joi.object({
  accountName: Joi.string().min(2).max(50).required().messages({
    'any.required': 'Account name is required',
    'string.empty': 'Account name cannot be empty',
    'string.min': 'Account name must be at least 2 characters long',
    'string.max': 'Account name cannot exceed 50 characters',
  }),
  market: Joi.string().required().messages({
    'any.required': 'Market type is required (e.g., Forex, Crypto, Stocks, Futures)',
  }),
  accountType: Joi.string().required().messages({
    'any.required': 'Account type is required (e.g., Live, Demo, Funded)',
  }),
  startingBalance: Joi.number().min(0).default(0.0).messages({
    'number.min': 'Starting balance cannot be negative',
  }),
  currency: Joi.string().max(10).default('USD'),
});

export { createTradingAccountSchema };