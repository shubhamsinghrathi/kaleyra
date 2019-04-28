//the model schema for the mongoDB
import { Schema, model } from 'mongoose';

export const UserSessionSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'kal_users'
    },
    userToken: {
        type: String,
        index: true,
        default: ''
    }
},
    {
        timestamps: true
    }
);

export const UserSession = model('kal_usersessions', UserSessionSchema);