import type { Request, Response } from 'express';
import  TradingAccount  from '../models/TradingAccount.js';


const createTradingAccount = async (req: Request, res: Response) => {
  try {
    const userId = req.auth?.userId;
    const { accountName, market, accountType, startingBalance, currency } = req.body;

    // Optional: Check for duplicate account names per user
    const existingAccount = await TradingAccount.findOne({
      where: { userId, accountName },
    });

    if (existingAccount) {
      return res.status(400).json({ error: 'An account with this name already exists' });
    }

    const account = await TradingAccount.create({
      userId: userId!,
      accountName,
      market,
      accountType,
      startingBalance: startingBalance || 0.0,
      currency: currency || 'USD',
    });

    res.status(201).json({
      message: 'Trading account created successfully',
      account,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create trading account' });
  }
};

export { createTradingAccount };