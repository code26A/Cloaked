import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('cloakdb', 'postgres', 'Madhav#2003', {
    host: 'localhost',
    dialect: 'postgres'
});

export { sequelize };