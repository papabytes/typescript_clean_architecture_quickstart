import { User } from "../../domain/entities/user";

export interface IGetUser {
    
    /**
     * Gets user by Email
     *
     * @param {string} email
     * @returns {Promise<User>}
     */
    getUserByEmail(email: string): Promise<User | null >

    /**
     * Gets user by id
     *
     * @param {string} id
     * @returns {Promise<User>}
     */
    getUserById(id: string): Promise<User | null>
}


export interface ICreateUser {   
    /**
     * Creates a new User
     *
     * @param {User} user
     * @returns {Promise<User>} with the Id filled
     */
    createUser(user: User): Promise<User>
}

export interface IUpdateUser {
    
    /**
     * Updates a user.
     *
     * @param {string} id - the user's unique identifier
     * @param {User} user - the new user data
     * @returns {Promise<User>} - the updated user information
     */
    updateUser(id: string, user: User): Promise<User>
}