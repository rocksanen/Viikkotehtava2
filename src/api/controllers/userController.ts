// TODO: create the following functions:
// - userGet - get user by id
// - userListGet - get all users
// - userPost - create new user. Remember to hash password
// - userPutCurrent - update current user
// - userDeleteCurrent - delete current user
// - checkToken - check if current user token is valid: return data from req.user. No need for database query
import { NextFunction, Request, Response } from 'express';
import User from '../models/userModel';
import CustomError from '../../classes/CustomError';
import { UserTest } from '../../interfaces/User';
import { Types } from 'mongoose';

const userGet = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await User.findById(req.params.userId);
        if(!user) {
            next(new CustomError('No user found',  404));
            return;
        }

        res.json(user);
    } catch (err) {
        next(new CustomError('Something went wrong with the server', 500));
    }
}

const userListGet = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const users = await User.find({});
        if(!users || users.length === 0) {
            next(new CustomError('No users found',  404));
            return;
        }

        res.json(users);
    } catch (err) {
        next(new CustomError('Something went wrong with the server', 500));
    }
}

const userPost = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.json(user);
    } catch (err) {
        next(new CustomError('Something went wrong with the server', 500));
    }
}

const userPutCurrent = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await User.findById(req.body.user._id);
        if(!user) {
            next(new CustomError('No user found',  404));
            return;
        }

        user.user_name = req.body.user_name;
        user.email = req.body.email;
        user.role = req.body.role;
        await user.save();

        res.json(user);
    } catch (err) {
        next(new CustomError('Something went wrong with the server', 500));
    }
}

const userDeleteCurrent = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await User.findById(req.body.user._id);
        if(!user) {
            next(new CustomError('No user found',  404));
            return;
        }

        await user.deleteOne();

        res.json(user);
    } catch (err) {
        next(new CustomError('Something went wrong with the server', 500));
    }
}

const checkToken = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        res.json(req.user);
    } catch (err) {
        next(new CustomError('Something went wrong with the server', 500));
    }
}

export{
    userGet,
    userListGet,
    userPost,
    userPutCurrent,
    userDeleteCurrent,
    checkToken
};



