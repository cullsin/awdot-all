import mongoose  from '../../common/services/mongoose.service.js';
import { v4 } from 'uuid';
const Schema = mongoose.Schema;
const clientsSchema = new Schema({
    _id: { type: String, default: v4 },
    name: {type: String, required: true },
    created_date: {type: Date, default: Date.now},
    updated_date: {type: Date, default: Date.now},
    is_deleted: {type: Boolean, default: false }
});

const prodPartnersSchema = new Schema({
    _id: { type: String, default: v4 },
    clients_id: {type: String, 'required': true },
    partners_id: {type: String, 'required': true },
    created_date: {type: Date, default: Date.now},
    updated_date: {type: Date, default: Date.now},
    is_deleted: {type: Boolean, default: false }
});

prodPartnersSchema.index({ clients_id: 1, partners_id: 1 }, { unique: true });

const clients = mongoose.model('clients',clientsSchema,'clients');
const prodPartners = mongoose.model('prodPartners',prodPartnersSchema,'partners_clients');

export async function createclients(data) {
    const prod = new clients(data);
    const result = await prod.save();
    return result;
}

export async function createProdPartners(data) {
    const prods = new prodPartners(data);
    const result = await prods.save();
    return result;
}

export async function getClientsByCreated(created_by) {
    const result = await clients.find({created_by, is_deleted: false}).exec();
    return result;
}

export async function getClientsById(id) {
    return await clients.findById(id);
}

export async function updateProdPartners(data) {
    const updated = await prodPartners.findById(data.prodpartners_id);
    await updated.updateOne({...data});
    return await prodPartners.findById(data.prodpartners_id);
}

export async function getClients() {
    const result = await clients.find({is_deleted: false}).exec();
    return result;
}

export async function getProdPartners(partners_id) {
    const result = await prodPartners.find({partners_id, is_deleted: false}).exec();
    return result;
}

clientsSchema.set('toJSON', {
    virtuals: true
});

clientsSchema.options.toJSON.transform = function (doc, ret, options) {
    ret.clients_id = ret._id;
    delete ret._id;
    delete ret.__v;
}

prodPartnersSchema.set('toJSON', {
    virtuals: true
});

prodPartnersSchema.options.toJSON.transform = function (doc, ret, options) {
    ret.partners_clients_id = ret._id;
    delete ret._id;
    delete ret.__v;
}