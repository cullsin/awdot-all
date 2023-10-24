import moment from 'moment';
import mongoose  from '../../common/services/mongoose.service.js';
import { v4 } from 'uuid';
const Schema = mongoose.Schema;
const messageSchema = new Schema({
    _id: { type: String, default: v4 },
    product_id: {type: String, 'required': true },
    user_id: {type: String, 'required': true },
    content: {type: String, 'required': true },
    created_date: {type: Date, default: Date.now},
    is_deleted: {type: Boolean, default: false }
});

const Message = mongoose.model('message',messageSchema,'message');

export async function getmessageById(id) {
    return await Message.findById(id);
}

export async function getmessageByProductId(product_id) {
    return await Message.find({product_id, is_deleted: false }).exec();
}

export async function insert(message) {
    const updatedMessage = new Message(message);
    return await updatedMessage.save();
}

export async function remove(message) {
    const updatedMessage = await Message.findById(message.message_id);
    await updatedMessage.updateOne({is_deleted: true});
    return await Message.findById(message.message_id);
}

messageSchema.set('toJSON', {
    virtuals: true
});

messageSchema.options.toJSON.transform = function (doc, ret, options) {
    ret.message_id = ret._id;
    delete ret._id;
    delete ret.__v;
}