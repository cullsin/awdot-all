import moment from 'moment';
import mongoose  from '../../common/services/mongoose.service.js';
import { v4 } from 'uuid';
const Schema = mongoose.Schema;

const BankSchema = new Schema({
    _id: { type: String, default: v4 },
    user_id: {type: String, 'required': true },
    account_id: {type:String, required: true},
    account_id_updated: {type:Boolean, required: false, default: false},
    branch_id: {type: String, 'required': true },
    bank_name:  {type: String, 'required': true },
    bank_account_name: {type: String, 'required': true },
    bank_account_no: {type: String, 'required': true },
    bank_currency:  {type: String, 'required': true },
    bank_country: {type: String, 'required': true },
    is_deleted: {type: Boolean, default: false }
});

const Bank = mongoose.model('bank',BankSchema,'bank');

export async function getBankById(id) {
    return await Bank.findById(id);
}

// Ensure virtual fields are serialised.
BankSchema.set('toJSON', {
    virtuals: true
});

BankSchema.options.toJSON.transform = function (doc, ret, options) {
    ret.bank_id = ret._id;
    delete ret._id;
    delete ret.__v;
}

export async function createBank(bank) {
    const object = new Bank(bank);
    const result = await object.save();
    return result;
}

export async function findByUser(user_id) {
    return await Bank.find({user_id, is_deleted: false }).exec();
}

export async function remove(bank) {
    const updatedMessage = await Bank.findById(bank.bank_id);
    await updatedMessage.updateOne({is_deleted: true});
    return await Bank.findById(bank.bank_id);
}

export async function updateBank(bank) {
    const updatedMessage = await Bank.findById(bank.bank_id);
    await updatedMessage.updateOne({ account_id_updated: true});
    return await Bank.findById(bank.bank_id);
}