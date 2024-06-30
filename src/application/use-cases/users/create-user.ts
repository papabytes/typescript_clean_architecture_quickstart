import { randomUUID } from "crypto";
import { User } from "../../../domain/entities/user";
import { IUserRepository } from "../../../domain/interfaces/user-repository-interface";
import { ICreateUser } from "../../interfaces/use-cases";
import bcrypt from 'bcrypt';


export class CreateUser implements ICreateUser {

    /**
     *
     */
    constructor(private userRepository: IUserRepository) {
        
    }

    async createUser(user: User): Promise<User> {
        const hashRounds = process.env.ENCRYPTION_HASH_ROUNDS && parseInt(process.env.ENCRYPTION_HASH_ROUNDS) || 10;
        let hashPassword = await bcrypt.hash(user.password, hashRounds);

        // normalization of email to lowercase
        user.email = user.email.toLowerCase();
        user.password = hashPassword;
        user.id = randomUUID();
        return this.userRepository.createUser(user);
    }
}