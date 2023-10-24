import { getmessageByProductId, insert, remove } from '../models/message.model.js';
import { errorCodes } from '../../common/errors/errorCodes.js';

const { MESSAGE } = errorCodes;

export async function insertMessage(req, res, next) {
    const message = req.body;
    const result = await insert(message);
    if(result && result._id) {
        res.status(200).send({ success : true, result });       
    } else {
        res.status(200).send({ error: result, code: 'PAY077', message: MESSAGE.PAY077, success: false });           
    }
}

export async function getMessageByProduct(req, res, next) {
    const { product_id } = req.body;
    const messages = await getmessageByProductId(product_id);
    res.status(200).send({ success : true, messages });       
}

export async function deleteMessage(req, res, next) {
    try {
        const result = await remove(req.body);
        if(result && result.is_deleted === true) {
            res.status(200).send({ success : true, message: result });
        }
    } catch(error) {
        res.status(200).send({ error, code: 'PAY078', message: MESSAGE.PAY078, success: false });
    }   
}