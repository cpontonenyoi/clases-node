import express from 'express';
import cors from 'cors';
import AuthRouter from './auth/auth.js';
import { authAdmin, authClient } from './utils/auth.utils.js';
import ClientRouter from './client/client.js';

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use(AuthRouter);
app.use(ClientRouter);

app.get('/admin', authAdmin, (req, res) => {
    res.send(req.user);
});

app.listen(4000);
