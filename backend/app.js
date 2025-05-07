import express from 'express';
import cors from 'cors';
import morgan from "morgan";
import dayjs from "dayjs";
import dotenv from "dotenv";
import taskRoutes from "./routes/task.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Custom Morgan format: logs time, method, URL, status, response time
morgan.token("date", () => dayjs().format("YYYY-MM-DD HH:mm:ss"));
const logFormat = '[:date] ":method :url" :status - :response-time ms';

app.use(morgan(logFormat));

// Routes
app.use('/api/tasks', taskRoutes);

// Error Handler
app.use(errorMiddleware);

export default app;
