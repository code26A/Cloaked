// connection.js

import { sequelize } from './db.js'; // Adjust the path as per your project structure
import { User } from './models/user.js'; // Import the User model

export const connection = async () => {
    try {
        // Test the database connection
        await sequelize.authenticate();
        console.log('Connection to database has been established successfully.');

        // Synchronize the User model
        await User.sync(); // Only sync the User model, assuming other models are not shown

        console.log('Tables synchronized successfully.');

        // Export models if needed
        // export { User };

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
