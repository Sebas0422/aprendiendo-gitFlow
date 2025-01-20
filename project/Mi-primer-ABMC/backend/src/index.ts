import dotenv from 'dotenv';
dotenv.config();

import { app } from './app';
import './database';

async function main() {
    try {
        await app.listen({ port: 4000 });
        console.log(`Server running at http://localhost:${4000}`);
    } catch (err) {
        console.log(err);
        app.log.error(err);
        process.exit(1);
    }
}

main();
