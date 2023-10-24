import moment from 'moment';
import mongoose  from '../../common/services/mongoose.service.js';
const Schema = mongoose.Schema;
const fileConnectSchema = new Schema({
    file_id: {type: String,'required': true },
    connect_id: {type: String,'required': true },
    connect_type: {type: String,
        'required': true, 
        enum : ['user-identity',
        'user-profile',
        'companies-logo',
        'companies-profile',
        'investment-logo',
        'investment-profile',
        'partners-logo',
        'partners-profile',
        'transaction'], default: 'user-identity' },
    created_by:{type: String,'required': true },
    created_date: {type: Date, default: Date.now},
    updated_date: {type: Date, default: Date.now},
    is_deleted: {type: Boolean, default: false} 
}, { strict: false });

const FileConnect = mongoose.model('file_connect',fileConnectSchema,'file_connect');

export async function createFileConnect(data) {
    const Connect = new FileConnect(data);
    const result = await Connect.save();
    return result;
}

export async function getFileConnectById(id) {
    return await FileConnect.findById(id);
}

export async function getFileByConnect(data) {
    if(data.connect_type) {
        const result = await FileConnect.find({connect_id: data.connect_id, is_deleted: false, connect_type: data.connect_type}).sort({created_date:-1}).exec();
        return result.map((r) => r.toObject());    
    } else {
        const result = await FileConnect.find({connect_id: data.connect_id, is_deleted: false }).sort({created_date:-1}).exec();
        return result.map((r) => r.toObject());
    }
}

// Ensure virtual fields are serialised.
fileConnectSchema.set('toJSON', {
    virtuals: true
});

fileConnectSchema.options.toJSON.transform = function (doc, ret, options) {
    delete ret._id;
    delete ret.__v;
}

export async function removeFileConnect(data) {
    const connect = await FileConnect.find({file_id: data.file_id, is_deleted: false}).exec();
    connect[0].is_deleted = true;
    return await connect[0].save();
}