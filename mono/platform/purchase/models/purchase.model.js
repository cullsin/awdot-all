import mongoose  from '../../common/services/mongoose.service.js';
import { v4 } from 'uuid';
const Schema = mongoose.Schema;
const purchaseSchema = new Schema({
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
    is_deleted: {type: Boolean, default: false },
});

const Purchase = mongoose.model('purchase',purchaseSchema,'purchase');

export async function createPurchase(data) {
    const purchase = new Purchase(data);
    const result = await purchase.save();
    return result;
}

export async function getPurchaseByCreated(created_by) {
    const result = await Purchase.find({created_by, is_deleted: false}).exec();
    return result;
}

export async function getPurchaseById(id) {
    return await Purchase.findById(id);
}

export async function updatePurchase(data) {
    const updatedPurchase = await Purchase.findById(data.purchase_id);
    await updatedPurchase.updateOne({...data});
    return await Purchase.findById(data.purchase_id);
}

// Ensure virtual fields are serialised.
purchaseSchema.set('toJSON', {
    virtuals: true
});

purchaseSchema.options.toJSON.transform = function (doc, ret, options) {
    ret.purchase_id = ret._id;
    delete ret._id;
    delete ret.__v;
}