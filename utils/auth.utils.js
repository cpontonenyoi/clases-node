import User from "../user/user.model.js";
import jwt from "jsonwebtoken";

function authClient(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        res.status(405).send('not auth');
    }

    const objectToken = jwt.decode(token, '3de113c0-757c-45be-a5ab-238221699cd2');

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

    const objectToken = jwt.decode(token, '3de113c0-757c-45be-a5ab-238221699cd2');

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

export {
    authAdmin,
    authClient
}
