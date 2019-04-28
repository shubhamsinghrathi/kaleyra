//the model schema for the mongoDB
import { Schema, model } from 'mongoose';

export const MessageSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'kal_users',
        index: true
    },
    fromNumber: {
        type: String
    },
    toNumber: {
        type: String
    },
    message: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        default: "Success"
    },
    isBroadcast: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    }
);

export const Message = model('kal_messages', MessageSchema);