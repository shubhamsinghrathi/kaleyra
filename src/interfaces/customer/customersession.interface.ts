import { Document, mongo } from 'mongoose';
const { ObjectId } = mongo;

export interface ICustomerSession extends Document {

    _id: any;
    customerId: any;
    // isDeleted: boolean;
    lastActiveTime: Date;
    arn: any;

}
