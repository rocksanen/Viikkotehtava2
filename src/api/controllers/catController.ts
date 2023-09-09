// TODO: create following functions:
// - catGetByUser - get all cats by current user id
// - catGetByBoundingBox - get all cats by bounding box coordinates (getJSON)
// - catPutAdmin - only admin can change cat owner
// - catDeleteAdmin - only admin can delete cat
// - catDelete - only owner can delete cat
// - catPut - only owner can update cat
// - catGet - get cat by id
// - catListGet - get all cats
// - catPost - create new cat

import { NextFunction, Request, Response } from 'express';
import Cat from '../models/catModel';
import User from '../models/userModel';
import CustomError from '../../classes/CustomError';

const catGetByUser = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const cats = await Cat.find({ 'owner._id': req.params.userId });
        if(!cats || cats.length === 0) {
            next(new CustomError('No cats found',  404));
            return;
        }

        res.json(cats);
    } catch (err) {
        next(new CustomError('Something went wrong with the server', 500));
    }
}

const catGetByBoundingBox = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const cats = await Cat.find({
            location: {
                $geoWithin: {
                    $geometry: {
                        type: 'Polygon',
                        coordinates: req.body.coordinates
                    }
                }
            }
        });
        if(!cats || cats.length === 0) {
            next(new CustomError('No cats found',  404));
            return;
        }

        res.json(cats);
    } catch (err) {
        next(new CustomError('Something went wrong with the server', 500));
    }
}

const catPutAdmin = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const cat = await Cat.findById(req.params.catId);
        if(!cat) {
            next(new CustomError('No cat found',  404));
            return;
        }

        const user = await User.findById(req.body.owner._id);
        if(!user) {
            next(new CustomError('No user found',  404));
            return;
        }

        const updatedCat = await Cat.findByIdAndUpdate(
            req.params.catId,
            req.body,
            { new: true }
        );

        res.json(updatedCat);
    } catch (err) {
        next(new CustomError('Something went wrong with the server', 500));
    }
}

const catDeleteAdmin = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const cat = await Cat.findById(req.params.catId);
        if(!cat) {
            next(new CustomError('No cat found',  404));
            return;
        }

        const deletedCat = await Cat.findByIdAndDelete(req.params.catId);

        res.json(deletedCat);
    } catch (err) {
        next(new CustomError('Something went wrong with the server', 500));
    }
}

const catDelete = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const cat = await Cat.findById(req.params.catId);
        if(!cat) {
            next(new CustomError('No cat found',  404));
            return;
        }

        if(cat.owner._id.toString() !== req.params.userId) {
            next(new CustomError('You are not authorized to delete this cat',  401));
            return;
        }

        const deletedCat = await Cat.findByIdAndDelete(req.params.catId);

        res.json(deletedCat);
    } catch (err) {
        next(new CustomError('Something went wrong with the server', 500));
    }
}

const catPut = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const cat = await Cat.findById(req.params.catId);
        if(!cat) {
            next(new CustomError('No cat found',  404));
            return;
        }

        if(cat.owner._id.toString() !== req.params.userId) {
            next(new CustomError('You are not authorized to update this cat',  401));
            return;
        }

        const updatedCat = await Cat.findByIdAndUpdate(
            req.params.catId,
            req.body,
            { new: true }
        );

        res.json(updatedCat);
    } catch (err) {
        next(new CustomError('Something went wrong with the server', 500));
    }
}

const catGet = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const cat = await Cat.findById(req.params.catId);
        if(!cat) {
            next(new CustomError('No cat found',  404));
            return;
        }

        res.json(cat);
    } catch (err) {
        next(new CustomError('Something went wrong with the server', 500));
    }
}

const catListGet = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const cats = await Cat.find();
        if(!cats || cats.length === 0) {
            next(new CustomError('No cats found',  404));
            return;
        }

        res.json(cats);
    } catch (err) {
        next(new CustomError('Something went wrong with the server', 500));
    }
}

const catPost = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await User.findById(req.body.owner._id);
        if(!user) {
            next(new CustomError('No user found',  404));
            return;
        }

        const cat = new Cat(req.body);
        const savedCat = await cat.save();

        res.json(savedCat);
    } catch (err) {
        next(new CustomError('Something went wrong with the server', 500));
    }
}

export {
    catGetByUser,
    catGetByBoundingBox,
    catPutAdmin,
    catDeleteAdmin,
    catDelete,
    catPut,
    catGet,
    catListGet,
    catPost
};



