import moment from 'moment';
import mongoose  from '../../common/services/mongoose.service.js';
import { v4 } from 'uuid';
const Schema = mongoose.Schema;

const StripeSchema = new Schema({
    _id: { type: String, default: v4 },
    connect_id: {type: String, 'required': true },
    connect_type: {type: String, 'required': true },
    payment_intent: {type: String, 'required': false },
    stripe_status:  {type: String, 'required': true },
    created_by: {type: String, 'required': true },
    created_date: {type: Date, default: Date.now},
    is_deleted: {type: Boolean, default: false }
});

const Stripe = mongoose.model('stripe',StripeSchema,'stripe');

export async function getStripeById(id) {
    return await Stripe.findById(id);
}

export async function getStripeByPurchaseAndPayIntent(purchase_id, payment_intent) {
    const result = await Stripe.find({purchase_id, is_deleted: false, payment_intent}).exec();
    return result[0];
}

// Ensure virtual fields are serialised.
StripeSchema.set('toJSON', {
    virtuals: true
});

StripeSchema.options.toJSON.transform = function (doc, ret, options) {
    ret.bank_id = ret._id;
    delete ret._id;
    delete ret.__v;
}

export async function saveStripe(stripe) {
    const updatedStripe = new Stripe(stripe);
    const result = await updatedStripe.save();
    return result;
}
