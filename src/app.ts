import express from "express";
import type { Request, Response } from "express";

const app = express();

app.use(express.json());

app.get('/api/v1/health', (req: Request, res: Response) => {
   res.status(200).json({
    status: 'success',
    message: 'Trading Journal API v1 is running running live.',
    timestamp: new Date().toISOString(),
   });
});

export default app;