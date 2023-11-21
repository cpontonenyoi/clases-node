import { DataTypes, Model } from "sequelize";
import sequelize from "../connect.js";

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

export default User;