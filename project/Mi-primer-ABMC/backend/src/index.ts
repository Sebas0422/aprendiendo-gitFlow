import dotenv from 'dotenv';
dotenv.config();

import { app } from './app';
import './configurations/database';

async function main() {
    try {
        await app.listen({ port: 4000 });
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
}

main();
