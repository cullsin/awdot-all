import mongoose  from '../../common/services/mongoose.service.js';
import { v4 } from 'uuid';
const Schema = mongoose.Schema;
const interestSchema = new Schema({
    _id: { type: String, default: v4 },
    name: {type: String, required: true },
    created_date: {type: Date, default: Date.now},
    updated_date: {type: Date, default: Date.now},
    is_deleted: {type: Boolean, default: false }
});

const catPartnersSchema = new Schema({
    _id: { type: String, default: v4 },
    interest_id: {type: String, 'required': true },
    partners_id: {type: String, 'required': true },
    created_date: {type: Date, default: Date.now},
    updated_date: {type: Date, default: Date.now},
    is_deleted: {type: Boolean, default: false }
});

const interest = mongoose.model('interest',interestSchema,'interest');
const catPartners = mongoose.model('catPartners',catPartnersSchema,'partners_interest');

export async function createinterest(data) {
    const cate = new interest(data);
    const result = await cate.save();
    return result;
}

export async function createCatPartners(data) {
    const cats = new catPartners(data);
    const result = await cats.save();
    return result;
}

export async function getInterestByCreated(created_by) {
    const result = await interest.find({created_by, is_deleted: false}).exec();
    return result;
}

export async function getInterestById(id) {
    return await interest.findById(id);
}

export async function updateCatPartners(data) {
    const updated = await catPartners.findById(data.catpartners_id);
    await updated.updateOne({...data});
    return await catPartners.findById(data.catpartners_id);
}

export async function getInterest() {
    const result = await interest.find({is_deleted: false}).exec();
    return result;
}

export async function getCatPartners(partners_id) {
    const result = await catPartners.find({partners_id, is_deleted: false}).exec();
    return result;
}

interestSchema.set('toJSON', {
    virtuals: true
});

interestSchema.options.toJSON.transform = function (doc, ret, options) {
    ret.interest_id = ret._id;
    delete ret._id;
    delete ret.__v;
}

catPartnersSchema.set('toJSON', {
    virtuals: true
});

catPartnersSchema.options.toJSON.transform = function (doc, ret, options) {
    ret.partners_interest_id = ret._id;
    delete ret._id;
    delete ret.__v;
}