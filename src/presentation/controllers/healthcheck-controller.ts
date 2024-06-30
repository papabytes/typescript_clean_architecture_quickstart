import { Request, Response } from "express";

export class HealthCheckController {

    constructor() { }

    getHealthStatus(req: Request, res: Response) {
        res.status(200).json({
            status: "healthy"
        })
    }
}