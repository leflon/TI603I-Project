import mysql from 'mysql2/promise';
import { config } from 'dotenv';
import { stderr, stdout } from 'process';
const { exec } = require('child_process');
config();

async function resetDatabase() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    });

    const databaseName = process.env.DB_DATABASE;

    try {
        console.log(`Dropping database ${databaseName} if it exists...`);
        await connection.query(`DROP DATABASE IF EXISTS \`${databaseName}\`;`);

        console.log(`Creating database ${databaseName}...`);
        await connection.query(`CREATE DATABASE \`${databaseName}\`;`);


        await new Promise((resolve, reject) => {
            exec('mysql -u root -p ti603i_project < ../database/schemas.sql', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing schemas.sql: ${stderr}`);
                return reject(error);
            }
            console.log(`schemas.sql executed successfully: ${stdout}`);
            resolve();
            });
        });

        await new Promise((resolve, reject) => {
            exec('mysql -u root -p ti603i_project < ../database/populate.sql', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing populate.sql: ${stderr}`);
                return reject(error);
            }
            console.log(`populate.sql executed successfully: ${stdout}`);
            resolve();
            });
        });

        
        

    } catch (error) {
        console.error('Error resetting the database:', error);
    } finally {
        await connection.end();
    }
}

resetDatabase();