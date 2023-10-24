import mongoose  from '../../common/services/mongoose.service.js';
import { v4 } from 'uuid';
const Schema = mongoose.Schema;
const redeemSchema = new Schema({
    _id: { type: String, default: v4 },
    created_by: {type: String, required : true },
    number_of_dots: {type: Number, required : true },
    total_amount: {type: Number, required: true },
    transaction_amount: {type: Number, required: true },
    actual_amount: {type: Number, required: true },
    currency: {type: String, required: true },
    created_date: {type: Date, default: Date.now},
    updated_date: {type: Date, default: Date.now},
    is_active: {type: Boolean, default: false },
    is_deleted: {type: Boolean, default: false }
});

const Redeem = mongoose.model('redeem',redeemSchema,'redeem');

export async function createRedeem(data) {
    const redeem = new Redeem(data);
    const result = await redeem.save();
    return result;
}

export async function getRedeemByCreated(created_by) {
    const result = await Redeem.find({created_by, is_deleted: false}).exec();
    return result;
}

export async function getRedeemById(id) {
    return await Redeem.findById(id);
}

export async function updateRedeem(data) {
    const updatedRedeem = await Redeem.findById(data.redeem_id);
    await updatedRedeem.updateOne({...data});
    return await Redeem.findById(data.redeem_id);
}

// Ensure virtual fields are serialised.
redeemSchema.set('toJSON', {
    virtuals: true
});

redeemSchema.options.toJSON.transform = function (doc, ret, options) {
    ret.redeem_id = ret._id;
    delete ret._id;
    delete ret.__v;
}