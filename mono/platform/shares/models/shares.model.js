import moment from 'moment';
import mongoose  from '../../common/services/mongoose.service.js';
import { v4 } from 'uuid';
const Schema = mongoose.Schema;
const SharesSchema = new Schema({
    _id: { type: String, default: v4 },
    created_by: {type: String, required : true },
    companies_id: {type: String, required : false },
    number_of_shares: {type: Number, 'required': true },
    base_price: {type: Number, 'required': true },
    updated_date: {type: Date, default: Date.now},
    created_date: {type: Date, default: Date.now},
    is_deleted: {type: Boolean, default: false },
    is_active: {type: Boolean, default: true }
});

const Shares = mongoose.model('shares',SharesSchema,'shares');

export async function createShares(data) {
    const getResult = await Shares.find({companies_id: data.companies_id, created_by: data.created_by, is_deleted: false}).exec();
    const shares_id = getResult && getResult[0];
    if (shares_id) {
        const updatedShares = await Shares.findById(shares_id);
        data.number_of_shares = Number(updatedShares.number_of_shares) + Number(data.number_of_shares);
        await updatedShares.updateOne({...data});
        return await Shares.findById(shares_id);
    } else {
        const shares = new Shares(data);
        return await shares.save();
    }
}

export async function getSharesByCompanies(companies_id, created_by) {
    const result = await Shares.find({companies_id, created_by, is_deleted: false}).exec();
    return result;
}

export async function getSharesByCreated(created_by) {
    const result = await Shares.find({created_by, is_deleted: false}).exec();
    return result;
}

export async function getSharesById(id) {
    return await Shares.findById(id);
}

export async function updateShares(data) {
    const updatedShares = await Shares.findById(data.shares_id);
    await updatedShares.updateOne({...data});
    return await Shares.findById(data.shares_id);
}

export async function updateSharesCount(data) {
    const id = data.from_shares_id;
    const updatedShares = await Shares.findById(id);
    const number_of_shares = Number(updatedShares.number_of_shares) - Number(data.to_available_of_shares);
    await updatedShares.updateOne({number_of_shares});
    return await Shares.findById(id);
}

// Ensure virtual fields are serialised.
SharesSchema.set('toJSON', {
    virtuals: true
});

SharesSchema.options.toJSON.transform = function (doc, ret, options) {
    ret.shares_id = ret._id;
    delete ret._id;
    delete ret.__v;
}