import { User } from "../../../domain/entities/user";
import { IUserRepository } from "../../../domain/interfaces/user-repository-interface";
import { IGetUser } from "../../interfaces/use-cases";

export class GetUser implements IGetUser {
    
    /**
     *
     */
    constructor(private repository: IUserRepository) {
    }


    getUserByEmail(email: string): Promise<User| null> {
        return this.repository.getUserByEmail(email);
    }

    getUserById(id: string): Promise<User | null> {
        return this.repository.getUserById(id);
    }
}