import { Request, Response } from "express";
import { ICreateUser, IGetUser } from "../../application/interfaces/use-cases";
import { User } from "../../domain/entities/user";

export class UsersController {
    constructor(private getUserUseCase: IGetUser, private createUserUseCase: ICreateUser) {

    }

    async getUserById(req: Request, res: Response) {

        let id = req.params.id;
        if (!id) {
            res.status(400).json({ error: "Missing id" });
            return;
        }

        let user = await this.getUserUseCase.getUserById(id);
        if(!user) {
            res.status(404).json({ error: `User with ID='${id}' not found` });
            return;
        }

        return res.status(200).json(user);
 
    }

    async createUser(req: Request, res: Response) {
        let user = req.body as User;
        if (!user) {
            res.status(400).json({ error: "Missing user data" });
            return;
        }

        // validate if email is a valid email
        if (!user.email || !user.email.includes("@")) {
            res.status(400).json({ error: "Invalid email" });
            return;
        }

        let existingUser = await this.getUserUseCase.getUserByEmail(user.email);
        if (existingUser) {
            res.status(409).json({ error: `User with email='${user.email}' already exists` });
            return;
        }   

        let createdUser = await this.createUserUseCase.createUser(user);
        return res.status(201).json(createdUser);
    }
}