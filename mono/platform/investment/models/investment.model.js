import mongoose  from '../../common/services/mongoose.service.js';
import { v4 } from 'uuid';
const Schema = mongoose.Schema;
const investmentSchema = new Schema({
    _id: { type: String, default: v4 },
    name: {type: String, required: true },
    type: {type: String,'required': true, enum : ['ANGEL_INVESTOR','COMPANY'], default: 'ANGEL INVESTOR' },
    about: {type: String, required: true },
    url: {type: String, required: true },
    phone: {type: String, required: true },
    phoneCode:{type: String, required : true },
    email: {type: String, required: true },
    country: {type: String, required : true },
    created_by: {type: String, required : true },
    created_date: {type: Date, default: Date.now},
    updated_date: {type: Date, default: Date.now},
    is_deleted: {type: Boolean, default: false },
});

const Investment = mongoose.model('investment',investmentSchema,'investment');

export async function createInvestment(data) {
    const investment = new Investment(data);
    const result = await investment.save();
    return result;
}

export async function getInvestmentByCreated(created_by) {
    const result = await Investment.find({created_by, is_deleted: false}).exec();
    return result;
}

export async function getInvestmentById(id) {
    return await Investment.findById(id);
}

export async function updateInvestment(data) {
    const updatedInvestment = await Investment.findById(data.investment_id);
    await updatedInvestment.updateOne({...data});
    return await Investment.findById(data.investment_id);
}

export async function getInvestments(created_by) {
    const result = await Investment.find({created_by, is_deleted: false}).exec();
    return result;
}

// Ensure virtual fields are serialised.
investmentSchema.set('toJSON', {
    virtuals: true
});

investmentSchema.options.toJSON.transform = function (doc, ret, options) {
    ret.investment_id = ret._id;
    delete ret._id;
    delete ret.__v;
}