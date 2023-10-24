import mongoose  from '../../common/services/mongoose.service.js';
import { v4 } from 'uuid';
const Schema = mongoose.Schema;
const categoriesSchema = new Schema({
    _id: { type: String, default: v4 },
    name: {type: String, required: true },
    created_date: {type: Date, default: Date.now},
    updated_date: {type: Date, default: Date.now},
    is_deleted: {type: Boolean, default: false }
});

const catCompaniesSchema = new Schema({
    _id: { type: String, default: v4 },
    categories_id: {type: String, 'required': true },
    companies_id: {type: String, 'required': true },
    created_date: {type: Date, default: Date.now},
    updated_date: {type: Date, default: Date.now},
    is_deleted: {type: Boolean, default: false }
});

const categories = mongoose.model('categories',categoriesSchema,'categories');
const catCompanies = mongoose.model('catCompanies',catCompaniesSchema,'companies_categories');

export async function createcategories(data) {
    const cate = new categories(data);
    const result = await cate.save();
    return result;
}

export async function createCatCompanies(data) {
    const cats = new catCompanies(data);
    const result = await cats.save();
    return result;
}

export async function getCategoriesByCreated(created_by) {
    const result = await categories.find({created_by, is_deleted: false}).exec();
    return result;
}

export async function getCategoriesById(id) {
    return await categories.findById(id);
}

export async function updateCatCompanies(data) {
    const updated = await catCompanies.findById(data.catcompanies_id);
    await updated.updateOne({...data});
    return await catCompanies.findById(data.catcompanies_id);
}

export async function getCategories() {
    const result = await categories.find({is_deleted: false}).exec();
    return result;
}

export async function getCatCompanies(companies_id) {
    const result = await catCompanies.find({companies_id, is_deleted: false}).exec();
    return result;
}

categoriesSchema.set('toJSON', {
    virtuals: true
});

categoriesSchema.options.toJSON.transform = function (doc, ret, options) {
    ret.categories_id = ret._id;
    delete ret._id;
    delete ret.__v;
}

catCompaniesSchema.set('toJSON', {
    virtuals: true
});

catCompaniesSchema.options.toJSON.transform = function (doc, ret, options) {
    ret.companies_categories_id = ret._id;
    delete ret._id;
    delete ret.__v;
}