//the model schema for the mongoDB
import { Schema, model } from 'mongoose';

export const UserSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    name: {
        type: String,
        default: ''
    },
    mobileNumber: {
        type: String,
        index: true,
        default: ''
    },
    password: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
);

export const User = model('kal_users', UserSchema);