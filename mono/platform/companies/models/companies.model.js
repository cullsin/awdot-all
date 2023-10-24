import mongoose  from '../../common/services/mongoose.service.js';
import { v4 } from 'uuid';
const Schema = mongoose.Schema;
const companiesSchema = new Schema({
    _id: { type: String, default: v4 },
    name: {type: String, required: true },
    short_name: {type: String, required : true },
    cin: {type: String, required: true }, // Company Identification Number
    about: {type: String, required: true },
    url: {type: String, required: true },
    video_url: {type: String, required: false },
    phoneCode:{type: String, required : true },
    phone:{type: String, required : true },
    email:{type: String, required : true },
    country: {type: String, required : true },
    revenue_amount: {type: Number, required : true },
    target_amount: {type: Number, required : true },
    achieved_amount: {type: Number, required : true },
    stage: {type: String, required : true, 
        enum: [
            'Pre-Seed',
            'Seed',
            'Series - A',
            'Series - B',
            'Series - C',
            'Series - D'
        ], default: 'Seed' },
    created_by: {type: String, required : true },
    created_date: {type: Date, default: Date.now},
    updated_date: {type: Date, default: Date.now},
    is_deleted: {type: Boolean, default: false }
});

const Companies = mongoose.model('companies',companiesSchema,'companies');

export async function createCompanies(data) {
    const companies = new Companies(data);
    const result = await companies.save();
    return result;
}

export async function getCompaniesByCreated(created_by) {
    const result = await Companies.find({created_by, is_deleted: false}).exec();
    return result;
}

export async function getCompaniesByDomain(domain) {
    const result = await Companies.find({domain, is_deleted: false}).exec();
    return result;
}

export async function getCompaniesById(id) {
    return await Companies.findById(id);
}

export async function updateCompanies(data) {
    const updatedCompanies = await Companies.findById(data.companies_id);
    await updatedCompanies.updateOne({...data});
    return await Companies.findById(data.companies_id);
}

export async function getCompanies() {
    const result = await Companies.find({is_deleted: false}).exec();
    return result;
}

// Ensure virtual fields are serialised.
companiesSchema.set('toJSON', {
    virtuals: true
});

companiesSchema.options.toJSON.transform = function (doc, ret, options) {
    ret.companies_id = ret._id;
    delete ret._id;
    delete ret.__v;
}