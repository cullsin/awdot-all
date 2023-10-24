import mongoose  from '../../common/services/mongoose.service.js';
import { v4 } from 'uuid';
const Schema = mongoose.Schema;
const partnersSchema = new Schema({
    _id: { type: String, default: v4 },
    name: {type: String, required: true },
    about: {type: String, required: true },
    url: {type: String, required: true },
    phoneCode:{type: String, required : true },
    phone:{type: String, required : true },
    email:{type: String, required : true },
    country: {type: String, required : true },
    created_by: {type: String, required : true },
    created_date: {type: Date, default: Date.now},
    updated_date: {type: Date, default: Date.now},
    is_deleted: {type: Boolean, default: false }
});

const Partners = mongoose.model('partners',partnersSchema,'partners');

export async function createPartners(data) {
    const partners = new Partners(data);
    const result = await partners.save();
    return result;
}

export async function getPartnersByCreated(created_by) {
    const result = await Partners.find({created_by, is_deleted: false}).exec();
    return result;
}

export async function getPartnersByDomain(domain) {
    const result = await Partners.find({domain, is_deleted: false}).exec();
    return result;
}

export async function getPartnersById(id) {
    return await Partners.findById(id);
}

export async function updatePartners(data) {
    const updatedPartners = await Partners.findById(data.partners_id);
    await updatedPartners.updateOne({...data});
    return await Partners.findById(data.partners_id);
}

export async function getPartners() {
    const result = await Partners.find({is_deleted: false}).exec();
    return result;
}

// Ensure virtual fields are serialised.
partnersSchema.set('toJSON', {
    virtuals: true
});

partnersSchema.options.toJSON.transform = function (doc, ret, options) {
    ret.partners_id = ret._id;
    delete ret._id;
    delete ret.__v;
}