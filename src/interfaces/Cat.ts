// TODO: cat interface

import { Point } from 'geojson';
import { Document, Types } from 'mongoose';

interface Cat extends Document {
    cat_name: string;
    weight: number;
    filename: string;
    birthdate: string;
    location: {
        type: string;

        coordinates: Point;
    };
    owner: {
        _id: Types.ObjectId;
        user_name: string;
        email: string;
    };
}



export {Cat};





