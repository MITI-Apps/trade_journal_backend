import type { Response, Request } from 'express';
import { calculateDashboardData } from '../services/dashboard.service.js';
import  TradingAccount  from '../models/TradingAccount.js';

// Composed Full Dashboard Endpoint
export const getDashboard = async (req: Request, res: Response) => {
  try {
    const userId = req.auth?.userId!;
    const { accountId } = req.params;

    const data = await calculateDashboardData((accountId as string), userId);
    res.status(200).json(data);
  } catch (error: any) {
    if (error.message === 'ACCOUNT_NOT_FOUND') {
      return res.status(404).json({ error: 'Trading account not found or access denied' });
    }
    res.status(500).json({ error: 'Failed to load dashboard data' });
  }
};

// Standalone Performance Stats
export const getAccountStats = async (req: Request, res: Response) => {
  try {
    const userId = req.auth?.userId!;
    const { accountId } = req.params;

    const data = await calculateDashboardData(accountId as string, userId);
    res.status(200).json({ stats: data.stats });
  } catch (error: any) {
    if (error.message === 'ACCOUNT_NOT_FOUND') {
      return res.status(404).json({ error: 'Trading account not found' });
    }
    res.status(500).json({ error: 'Failed to load performance stats' });
  }
};

// Standalone Equity Curve Sparkline
export const getEquityCurve = async (req: Request, res: Response) => {
  try {
    const userId = req.auth?.userId!;
    const { accountId } = req.params;
    const range = (req.query.range as string) || 'all';

    const data = await calculateDashboardData(accountId as string, userId, range);
    res.status(200).json({
      range,
      points: data.equityCurve,
    });
  } catch (error: any) {
    if (error.message === 'ACCOUNT_NOT_FOUND') {
      return res.status(404).json({ error: 'Trading account not found' });
    }
    res.status(500).json({ error: 'Failed to load equity curve' });
  }
};

// List all user accounts (For Account Switcher)
export const getUserAccounts = async (req: Request, res: Response) => {
  try {
    const userId = req.auth?.userId!;
    const accounts = await TradingAccount.findAll({ where: { userId } });

    // Calculate metrics per account to ensure sync
    const accountList = await Promise.all(
      accounts.map(async (acc) => {
        const dashboard = await calculateDashboardData(acc.id, userId);
        return {
          id: acc.id,
          name: acc.accountName,
          market: acc.market,
          currency: acc.currency,
          currentBalance: dashboard.account.currentBalance,
          percentChange: dashboard.account.percentChange,
        };
      })
    );

    res.status(200).json(accountList);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trading accounts' });
  }
};