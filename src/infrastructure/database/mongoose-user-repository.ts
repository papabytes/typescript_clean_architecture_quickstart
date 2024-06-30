import mongoose from "mongoose";
import { User } from "../../domain/entities/user";
import { IUserRepository } from "../../domain/interfaces/user-repository-interface";
import { UserModel } from "./models/user-model";

export class MongooseUserRepository implements IUserRepository {

    constructor() {
        // 
    }

    async getUserById(id: string): Promise<User | null> {
        let mongooseId = new mongoose.Types.ObjectId(id);
        const user = await UserModel.findById(mongooseId);
        return user ? {
            id: user.id,
            name: user.name, 
            email: user.email,
            created_at: user.created_at,
            updated_at: user.updated_at, 
            deleted_at: user.deleted_at
        } as User : null;
    }
    
    async getUserByEmail(email: string): Promise<User | null> {
        const user = await UserModel.findOne({email: email});
        return user ? {
            id: user.id,
            name: user.name, 
            email: user.email,
            password: user.password_hash,
            created_at: user.created_at,
            updated_at: user.updated_at, 
            deleted_at: user.deleted_at
        } as User : null;
    }
    
    async createUser(user: User): Promise<User> {
        const createdUser = await UserModel.create({
            _id: new mongoose.Types.ObjectId(),
            name: user.name,
            email: user.email,
            password_hash: user.password,
            created_at: new Date(),
            updated_at: undefined,
            deleted_at: undefined
        });

        return {
            id: createdUser._id.toString(),
            name: createdUser.name, 
            email: createdUser.email,
            created_at: createdUser.created_at,
            updated_at: createdUser.updated_at, 
            deleted_at: createdUser.deleted_at
        } as User
    }


    async updateUser(id: string, user: User): Promise<User | null> {
        let mongooseId = new mongoose.Types.ObjectId(id);
        const replaceResult =  await UserModel.findOneAndReplace({_id: mongooseId}, {
            name: user.name,
            email: user.email,
            password_hash: user.password,
            created_at: user.created_at,
            updated_at: new Date(),
            deleted_at: undefined
        });

        return replaceResult ?
            {
                id: id.toString(),
                name: replaceResult.name,
                email: replaceResult.email,
                created_at: replaceResult.created_at,
                updated_at: replaceResult.updated_at,
                deleted_at: replaceResult.deleted_at
            } as User : null;
        
    }


    async deleteUser(id: string): Promise<void> {
        let mongooseId = new mongoose.Types.ObjectId(id);
        await UserModel.deleteOne({_id: mongooseId});
    }

}