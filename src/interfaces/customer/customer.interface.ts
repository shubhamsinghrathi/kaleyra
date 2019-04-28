import { Document } from 'mongoose';


export interface ICustomer extends Document {
    countryCode: string;
    mobileNumber: string;
    phoneNumber: string;
    email: string;
    name: string;
    otp: Number;
    otpGeneratedTime: Date;
    otpExpiryTime: Date;
    location: any;
    lat: any;
    long: any;
}
