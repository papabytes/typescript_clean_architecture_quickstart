import { Router } from "express";
import { HealthCheckController } from "../controllers/healthcheck-controller";

export const HealthRouter = () => {
    let controller = new HealthCheckController();
    let router = Router();
    router.get('/healthz', (req, res) => {
        return controller.getHealthStatus(req, res);
    });
    return router;
}