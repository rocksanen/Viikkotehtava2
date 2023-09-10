// TODO: mongoose schema for user

import * as mongoose from 'mongoose';
import { User } from '../../interfaces/User';

const userSchema = new mongoose.Schema<User>({
    user_name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {type: String},
    password: {type: String, required: true},
  });

export default mongoose.model<User>('User', userSchema);


