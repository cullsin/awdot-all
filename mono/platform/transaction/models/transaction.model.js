import moment from 'moment';
import mongoose  from '../../common/services/mongoose.service.js';
import { v4 } from 'uuid';
const Schema = mongoose.Schema;
const TransactionSchema = new Schema({
    _id: { type: String, default: v4 },
    created_by: {type: String, required : true },
    number_of_shares: {type: Number, required: true },
    companies_id: {type: String, required: true },
    from_id: {type: String, required: true },
    to_id: {type: String, required: true },
    transfer_hash: {type: String, required: true },
    total_amount: {type: Number,required: true, default: 0 },
    share_price: {type: Number,required: true, default: 0 },
    updated_date: {type: Date, default: Date.now},
    created_date: {type: Date, default: Date.now},
    is_deleted: {type: Boolean, default: false }
});

const Transaction = mongoose.model('transaction',TransactionSchema,'transaction');

export async function createTransaction(data) {
    const transaction = new Transaction(data);
    const result = await transaction.save();
    return result;
}

export async function getTransactionByCreated(created_by) {
    const result = await Transaction.find({created_by, is_deleted: false}).exec();
    return result;
}

export async function getTransactionById(id) {
    return await Transaction.findById(id);
}

// Ensure virtual fields are serialised
TransactionSchema.set('toJSON', {
    virtuals: true
});

TransactionSchema.options.toJSON.transform = function (doc, ret, options) {
    ret.transaction_id = ret._id;
    delete ret._id;
    delete ret.__v;
}
