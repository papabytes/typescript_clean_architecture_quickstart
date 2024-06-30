import { Router } from "express";
import { UsersController } from "../controllers/users-controller";
import { GetUser } from "../../application/use-cases/users/get-user";
import { MongooseUserRepository } from "../../infrastructure/database/mongoose-user-repository";
import { CreateUser } from "../../application/use-cases/users/create-user";


export const UserRoutes = (): Router => {
    const router = Router();

    var userRepository = new MongooseUserRepository();
    var getUserUseCase = new GetUser(userRepository)
    var createUserUseCase = new CreateUser(userRepository);

    let userController = new UsersController(getUserUseCase, createUserUseCase);

    router.get('/:id', async (req, res) => {
        await userController.getUserById(req, res);
    });

    router.post('/', async (req, res) => {
        await userController.createUser(req, res);
    });

    return router;
}