// Purpose: Interface for User model.
// Make LoginUser interface for login
// Make UserOutput interface for user output

import { Types } from 'mongoose';

interface User {
    _id: number;
    user_name: string;
    email: string;
    role: 'user' | 'admin';
    password: string;
}

interface UserTest {    
    user_name: string;
    email: string;
    password: string;
}

interface LoginUser {
    username: string;
    password: string;
}

interface UserOutput {
    _id: number;
    user_name: string;
    email: string;
}





export { User, UserTest,LoginUser,UserOutput };





