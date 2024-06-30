import { User } from "../entities/user";

export interface IUserRepository {
    getUserById(id: string): Promise<User | null>;
    getUserByEmail(email: string): Promise<User | null>;
    createUser(user: User): Promise<User>;
    updateUser(id: string, user: User): Promise<User | null>;
    deleteUser(id: string): Promise<void>;
}