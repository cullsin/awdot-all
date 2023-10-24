import moment from 'moment';
import mongoose  from '../../common/services/mongoose.service.js';
const Schema = mongoose.Schema;
const FileSchema = new Schema({
    name: {type: String,'required': true },
    size: {type: String,'required': true },
    type: {type: String,'required': true },
    time: {type: Number,'required': true },
    title: {type: String,'required': true },
    category: {type: String,
        'required': true, 
        enum : ['user-identity',
        'user-profile',
        'companies-logo',
        'companies-profile',
        'companies-pitch',
        'investment-logo',
        'investment-profile',
        'partners-logo',
        'partners-profile',
        'transaction'], default: 'user-identity' },
    created_by:{type: String,'required': true },
    file_stripe_id:{type: String,'required': true },
    created_date: {type: Date, default: Date.now},
    updated_date: {type: Date, default: Date.now},
    is_deleted: {type: Boolean, default: false} 
});

const File = mongoose.model('file',FileSchema,'file');

export async function createFile(data) {
    const fileP = new File(data);
    const result = await fileP.save();
    return result;
}

export async function getFileById(id) {
    return await File.findById(id);
}

// Ensure virtual fields are serialised.
FileSchema.set('toJSON', {
    virtuals: true
});

FileSchema.options.toJSON.transform = function (doc, ret, options) {
    delete ret._id;
    delete ret.__v;
}

export async function removeFile(id) {
    const file = await File.findById(id);
    file.is_deleted = true;
    return await file.save();
}