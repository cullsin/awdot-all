import moment from 'moment';
import mongoose  from '../../common/services/mongoose.service.js';
const Schema = mongoose.Schema;
const userOtpSchema = new Schema({
    user_id: { type: String, required:true},
    otp: {type: Number, 'required': true, default: Math.floor(1000 + Math.random() * 9000) },
    created_date: {type: Date, default: Date.now},
    updated_date: {type: Date, default: Date.now},
    is_deleted: {type: Boolean, default: false }
});

const UserOtp = mongoose.model('userOtp', userOtpSchema,'user_otp');

export async function createOtp(userOtpData) {  
    const exUserOtp = await UserOtp.find({user_id:userOtpData.user_id, is_deleted:false}).exec();
    if(exUserOtp.length > 0) {
        userOtpData = exUserOtp[0];
        userOtpData.otp = Math.floor(1000 + Math.random() * 9000);
    }
    const userOtp = new UserOtp(userOtpData);
    return await userOtp.save();
}

export async function getOtp({user_id}) {
    const result = await UserOtp.find({ user_id, is_deleted : false}).exec();
    return result[0];
}

// Ensure virtual fields are serialised.
userOtpSchema.set('toJSON', {
    virtuals: true
});

userOtpSchema.options.toJSON.transform = function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
}