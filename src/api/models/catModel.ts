// TODO: mongoose schema for cat


import * as mongoose from 'mongoose';
import { Cat } from '../../interfaces/Cat';

const Schema = mongoose.Schema;

const CatSchema = new Schema({
    cat_name: {
        type: String,
  
    },
    weight: {
        type: Number,
        required: true,

    },
    filename: {
        type: String,

    },
    birthdate: {
        type: String,
        required: true,

    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
            coordinates: [Number, Number],
        },
    },
    owner: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    }
});

export default mongoose.model<Cat>('Cat', CatSchema);




