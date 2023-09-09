// TODO: mongoose schema for user

import * as mongoose from 'mongoose';
import { User } from '../../interfaces/User';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    user_name: {
        type: String,
        required: 'Enter a user name'
    },
    email: {
        type: String,
        required: 'Enter an email'
    },
    role: {
        type: String,
        required: 'Enter a role'
    },
    password: {
        type: String,
        required: 'Enter a password'
    }
});

export default mongoose.model<User>('User', UserSchema);


