// TODO: mongoose schema for cat


import * as mongoose from 'mongoose';
import { Cat } from '../../interfaces/Cat';

const Schema = mongoose.Schema;

const CatSchema = new Schema({
    cat_name: {
        type: String,
        required: 'Enter a cat name'
    },
    weight: {
        type: Number,
        required: 'Enter a weight'
    },
    filename: {
        type: String,
        required: 'Enter a filename'
    },
    birthdate: {
        type: String,
        required: 'Enter a birthdate'
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    owner: {
        _id: {
            type: mongoose.Types.ObjectId,
            required: 'Enter an owner id'
        },
        user_name: {
            type: String,
            required: 'Enter a user name'
        },
        email: {
            type: String,
            required: 'Enter an email'
        }
    }
});

export default mongoose.model<Cat>('Cat', CatSchema);




