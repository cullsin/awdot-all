import mongoose  from '../../common/services/mongoose.service.js';
import { v4 } from 'uuid';
const Schema = mongoose.Schema;
const domainSchema = new Schema({
    _id: { type: String, default: v4 },
    name: {type: String, required: true },
    type: {type: String,'required': true, enum : ['profile','companies','investor', 'partners'], default: 'profile' },
    type_id: {type: String, required: true },
    created_by: {type: String, required : true },
    created_date: {type: Date, default: Date.now},
    updated_date: {type: Date, default: Date.now},
    is_deleted: {type: Boolean, default: false },
});

const Domain = mongoose.model('domain',domainSchema,'domain');

export async function createDomain(data) {
    const domain = new Domain(data);
    const result = await domain.save();
    return result;
}

export async function getDomainByCreated(created_by) {
    const result = await Domain.find({created_by, is_deleted: false}).exec();
    return result;
}

export async function getType(type_id) {
    const result = await Domain.find({type_id, is_deleted: false}).exec();
    return result && result[0];
}

export async function getDomainById(id) {
    return await Domain.findById(id);
}

export async function updateDomain(data) {
    const updatedDomain = await Domain.findById(data.domain_id);
    await updatedDomain.updateOne({...data});
    return await Domain.findById(data.domain_id);
}

export async function getDomains() {
    const result = await Domain.find({is_deleted: false}).exec();
    return result;
}

// Ensure virtual fields are serialised.
domainSchema.set('toJSON', {
    virtuals: true
});

domainSchema.options.toJSON.transform = function (doc, ret, options) {
    ret.domain_id = ret._id;
    delete ret._id;
    delete ret.__v;
}