import moment from 'moment';
import mongoose  from '../../common/services/mongoose.service.js';
import { v4 } from 'uuid';
const Schema = mongoose.Schema;
const BoughtSchema = new Schema({
    _id: { type: String, default: v4 },
    created_by: {type: String, required : true },
    shares_id: {type: String, required : false },
    investment_id: {type: String, required : false },
    updated_date: {type: Date, default: Date.now},
    created_date: {type: Date, default: Date.now},
    is_deleted: {type: Boolean, default: false }
});

const Bought = mongoose.model('bought',BoughtSchema,'bought');

export async function createBought(data) {
    const bought = new Bought(data);
    const result = await bought.save();
    return result;
}

export async function getBoughtByCreated(created_by) {
    const result = await Bought.find({created_by, is_deleted: false}).exec();
    return result;
}

export async function getBoughtById(id) {
    return await Bought.findById(id);
}

BoughtSchema.set('toJSON', {
    virtuals: true
});

export async function getSharesByInvestment(investment_id, created_by) {
    const result = await BoughtSchema.find({investment_id, created_by, is_deleted: false}).exec();
    return result;
}
BoughtSchema.options.toJSON.transform = function (doc, ret, options) {
    ret.bought_id = ret._id;
    delete ret._id;
    delete ret.__v;
}