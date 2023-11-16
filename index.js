import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import sequelize from './connect.js';
import { DataTypes, Model } from 'sequelize';

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

class User extends Model {
    getPasswordEncrypt() {
        return this.password;
    }
}

User.init({
    email: DataTypes.TEXT,
    password: DataTypes.TEXT,
    rol: DataTypes.ENUM(['CLIENT', 'ADMIN']),
}, {
    sequelize,
    modelName: 'User'
});

User.sync({ alter: true });

app.post('/login', async (req, res) => {
    const user = await User.findOne({where:{
        email: req.body.email
    }});
    if (user.getPasswordEncrypt() === req.body.password) {
        const token = jwt.sign({ id: user.id }, '123456');

        res.send({ token, rol: user.rol });
    } else {
        res.status(400).send('error');
    }
});

function authClient(req, res, next) {
    const token = req.headers['authorization'];

    console.log(token);

    if (!token) {
        res.status(405).send('not auth');
    }

    const objectToken = jwt.decode(token, '123456');

    req.user = {
        id: objectToken.id,
    };

    next();
}

async function authAdmin(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        res.status(403).send('not auth');
        return;
    }

    const objectToken = jwt.decode(token, '123456');

    const user = await User.findByPk(objectToken.id);

    if(user.rol !== 'ADMIN') {
        res.status(403).send('User is not a admin');
        return;
    }

    req.user = {
        id: objectToken.id,
    };

    next();
}

app.get('/client', authClient, (req, res) => {
    res.send(req.user);
});

app.get('/admin', authAdmin, (req, res) => {
    res.send(req.user);
});

app.listen(4000);
