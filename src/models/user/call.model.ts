//the model schema for the mongoDB
import { Schema, model } from 'mongoose';

export const CallSchema = new Schema({
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
    status: {
        type: String,
        default: "Success"
    }
},
    {
        timestamps: true
    }
);

export const Call = model('kal_calls', CallSchema);