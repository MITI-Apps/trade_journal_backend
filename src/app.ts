import express from "express";
import type { Request, Response } from "express";
import authRoutes from "./routes/auth.routes.js"
import "./models/index.js"

const app = express();

app.use(express.json());

//Authentication Routes
app.use('/api/v1/auth', authRoutes);

app.get('/api/v1/health', (req: Request, res: Response) => {
   res.status(200).json({
    status: 'success',
    message: 'Trading Journal API v1 is running running live.',
    timestamp: new Date().toISOString(),
   });
});

export default app;