import Sequelize from 'sequelize';

const sequelize = new Sequelize('postgres://yape:12345@localhost:5432/enyoi');

export default sequelize;