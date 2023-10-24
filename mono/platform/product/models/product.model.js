import mongoose  from '../../common/services/mongoose.service.js';
import { v4 } from 'uuid';
const Schema = mongoose.Schema;
const productSchema = new Schema({
    _id: { type: String, default: v4 },
    name: {type: String, required: true },
    summary: {type: String, required: true },
    created_date: {type: Date, default: Date.now},
    updated_date: {type: Date, default: Date.now},
    is_deleted: {type: Boolean, default: false }
});

const prodCompaniesSchema = new Schema({
    _id: { type: String, default: v4 },
    product_id: {type: String, 'required': true },
    companies_id: {type: String, 'required': true },
    created_date: {type: Date, default: Date.now},
    updated_date: {type: Date, default: Date.now},
    is_deleted: {type: Boolean, default: false }
});

const product = mongoose.model('product',productSchema,'product');
const prodCompanies = mongoose.model('prodCompanies',prodCompaniesSchema,'companies_product');

export async function createproduct(data) {
    const prod = new product(data);
    const result = await prod.save();
    return result;
}

export async function createProdCompanies(data) {
    const prods = new prodCompanies(data);
    const result = await prods.save();
    return result;
}

export async function getProductByCreated(created_by) {
    const result = await product.find({created_by, is_deleted: false}).exec();
    return result;
}

export async function getProductById(id) {
    return await product.findById(id);
}

export async function updateProdCompanies(data) {
    const updated = await prodCompanies.findById(data.prodcompanies_id);
    await updated.updateOne({...data});
    return await prodCompanies.findById(data.prodcompanies_id);
}

export async function getProduct() {
    const result = await product.find({is_deleted: false}).exec();
    return result;
}

export async function getProdCompanies(companies_id) {
    const result = await prodCompanies.find({companies_id, is_deleted: false}).exec();
    return result;
}

productSchema.set('toJSON', {
    virtuals: true
});

productSchema.options.toJSON.transform = function (doc, ret, options) {
    ret.product_id = ret._id;
    delete ret._id;
    delete ret.__v;
}

prodCompaniesSchema.set('toJSON', {
    virtuals: true
});

prodCompaniesSchema.options.toJSON.transform = function (doc, ret, options) {
    ret.companies_product_id = ret._id;
    delete ret._id;
    delete ret.__v;
}