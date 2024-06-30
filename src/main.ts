import express from 'express';
import { HealthRouter } from './presentation/routes/healthcheck-routes';
import { UserRoutes } from './presentation/routes/user-routes';
import dotenv from 'dotenv';
import { errorHandler } from './presentation/middlewares/internal-server-error-middleware';
import { connectToDatabase } from './infrastructure/database/mongo-db';
dotenv.config();

function readAndReturnEnvironmentVariable(key: string, defaultValue: any) : any {
    const value = process.env[key];
    if (!value) {
        console.log(`Environment variable ${key} not found. Using default value: ${defaultValue}`);
        return defaultValue;
    }
    return value;
}

async function startAsync() {
    const appPort = readAndReturnEnvironmentVariable("PORT", 3000);
    const app = express();
    connectToDatabase();
    app.use(express.json());
    app.use(errorHandler);

    // healthz route
    app.use(HealthRouter());
    // User routes
    app.use('/api/v1/users', UserRoutes());

    app.listen(appPort, () => {
        console.log(`Server is running on http://localhost:${appPort}`);
    });
}

startAsync().catch(err => {
    console.error(err);
});