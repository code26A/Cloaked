// models/user.js

import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js'; // Adjust the path as per your project structure

const User = sequelize.define('User', {
    // Model attributes
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    verificationToken: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export { User }; // Export the User model directly
