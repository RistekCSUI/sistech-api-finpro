import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import userRouter from './routes/user';
import articleRouter from './routes/article';
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../swagger.json";
import cors from 'cors'

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(morgan("tiny"));
app.use(express.json());
app.use('*.css', (req, res, next) => {
  res.set('Content-Type', 'text/css');
  next();
});

var allowedOrigins = ['http://localhost:3000', 'https://sistech-finpro.vercel.app'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
}

app.use(cors(options))

app.get('/', (req: Request, res: Response) => {
  res.send('Sistech Final Project API');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

// routing
app.use("/api/v1/users", userRouter)
app.use("/api/v1/articles", articleRouter)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
export default app;