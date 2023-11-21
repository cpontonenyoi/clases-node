import Express from 'express';
import jwt from 'jsonwebtoken';
import User from '../user/user.model.js';

const app = Express.Router();

app.post('/login', async (req, res) => {
    
    const user = await User.findOne({where:{
        email: req.body.email
    }});

    if (user.getPasswordEncrypt() === req.body.password) {
        const token = jwt.sign({ id: user.id }, '3de113c0-757c-45be-a5ab-238221699cd2');

        res.send({ token, rol: user.rol });
    } else {
        res.status(400).send('error');
    }
});

export default app;