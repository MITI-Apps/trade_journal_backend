import express from "express";
import type { Request, Response } from "express";
import authRoutes from "./routes/auth.routes.js"
import tradingAccountRoutes from "./routes/tradingAccount.routes.js"
import tradeRoutes from './routes/trade.routes.js';
import screenshotRoutes from './routes/screenshot.routes.js'
import "./models/index.js"

const app = express();

app.use(express.json());

//Authentication Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/trading-accounts', tradingAccountRoutes)
app.use('/api/v1/trades', tradeRoutes);
app.use('/api/v1', screenshotRoutes)

app.get('/api/v1/health', (req: Request, res: Response) => {
   res.status(200).json({
    status: 'success',
    message: 'Trading Journal API v1 is running running live.',
    timestamp: new Date().toISOString(),
   });
});

export default app;