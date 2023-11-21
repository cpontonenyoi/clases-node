import { DataTypes, Model } from "sequelize";
import sequelize from "../connect.js";

class Client extends Model {
    getPasswordEncrypt() {
        return this.password;
    }
}

Client.init({
    name: DataTypes.TEXT,
    email: DataTypes.TEXT,
    address: DataTypes.TEXT,
    phone: DataTypes.TEXT,
    status: {
        type: DataTypes.ENUM(['ACTIVE', 'DELETE']),
        defaultValue: 'ACTIVE'
    },
}, {
    sequelize,
    modelName: 'Client'
});

Client.sync({ alter: true });

export default Client;