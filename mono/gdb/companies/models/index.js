
import mongoose  from '../../common/services/mongoose.service.js';
import { v4 } from 'uuid';
import axios from 'axios';
import DotEnv from 'dotenv';
DotEnv.config();

const { gdbUrl, gdbApiKey } = process.env;
const https = axios.create({
    baseURL: gdbUrl,
    timeout: 50000
});

const Schema = mongoose.Schema;
const companiesSchema = new Schema({
    _id: { type: String, default: v4 },
    name: {type: String, required: true },
    status: {type: String, required: false },
    requested_by: {type: String, required : true },
    companies_id: {type: String, required: true }, // Company Identification Number
    created_date: {type: Date, default: Date.now},
    updated_date: {type: Date, default: Date.now},
    is_deleted: {type: Boolean, default: false }
});

const GDBCompanies = mongoose.model('GDBCompanies',companiesSchema,'GDBCompanies');

export async function createCompanies(data) {
    const companies = new GDBCompanies(data);
    const result = await companies.save();
    return result;
}

export async function getCompaniesByCreated(created_by) {
    const result = await GDBCompanies.find({created_by, is_deleted: false}).exec();
    return result;
}

export async function getCompaniesById(id) {
    return await GDBCompanies.findById(id);
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

export const getCompanies = async (params) => {
    try {
        return await https.post('/overview', params, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${gdbApiKey}`
            },
        });
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}