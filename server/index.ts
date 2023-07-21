import express, { Request, Response } from 'express';
const cors = require('cors');

const authRoutes = require("./routes/auth.ts");

const app = express();
const PORT = process.env.PORT || 4000;

require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req: Request, res: Response) => {
  (res as Response).send('Hello, World!');
});

app.use('/auth', authRoutes)

app.listen(PORT, () => console.log(`Nicole, the server is running on port ${PORT}`));
