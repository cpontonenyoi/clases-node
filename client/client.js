import Express from 'express';
import Client from './client.model.js';
import { authAdmin, authClient } from '../utils/auth.utils.js';

const app = Express.Router();

app.get('/client', authClient, async (req, res) => {
    const client = await Client.findAll({
        where: {
            status: "ACTIVE",
        }
    });

    res.send(client);
})

app.post('/client', authClient, async (req, res) => {
    const client = await Client.create(req.body);
    client.save();

    res.send({ status: "success" });
});

app.put('/client/:id', authClient, async (req, res) => {
    await Client.update(req.body, {
        where: {
            id: req.params.id
        }
    });

    res.send({ status: "success" });
});

app.delete('/client/:id', authClient, async (req, res) => {
    await Client.update({
        status: "DELETE", where: {
            id: req.params.id
        }
    });

    res.send({ status: "success" });
});

export default app;