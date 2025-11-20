import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import agendamentosRoutes from './routes/agendamentos.routes';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3333;

app.use(
  cors({
    origin: "*", 
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'API de Agendamentos - OK' });
});

app.use('/agendamentos', agendamentosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
