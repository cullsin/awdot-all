import DotEnv from 'dotenv';
DotEnv.config();
import { createPurchase, 
    getPurchaseById,
    getPurchaseByCreated,
    updatePurchase
} from '../models/purchase.model.js';
import { errorCodes } from '../../common/errors/errorCodes.js';
import { emitter } from '../../common/services/event.service.js';
const { PURCHASE } = errorCodes;

export async function doInsert(req, res) {
    const result = await createPurchase(req.body);
    if(result._id) {
        res.status(200).send({ code: '007', message: PURCHASE['007'], success: true, purchase:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '008', message: PURCHASE['008'], success: false });    
    }        
}

export async function doGet(req, res) {
    const { purchase_id } = req.body;
    const result = await getPurchaseById(purchase_id);
    if(result._id) {
        res.status(200).send({ code: '009', message: PURCHASE['009'], success: true, purchase:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '010', message: PURCHASE['010'], success: false });           
    }
}

export async function doUser(req, res) {
    const { created_by } = req.body;
    const result = await getPurchaseByCreated(created_by);
    if(result && result.length >= 0) {
        res.status(200).send({ code: '011', message: PURCHASE['011'], success: true, purchases:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '012', message: PURCHASE['012'], success: false, purchases:[] });           
    }
}

export async function doFee(req, res) {
    const fee = {
        transactionFee : process.env.transactionFee
    }    
    res.status(200).send({ code: '013', message: PURCHASE['013'], success: true, fee });        
}

export async function doUpdate(req, res) {
    const result = await updatePurchase(req.body);
    if(result._id) {
        if (result.is_active === true) {
            const ev = emitter.emit('EventWalletInsert', result);
        }
        res.status(200).send({ code: '014', message: PURCHASE['014'], success: true, purchase:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '015', message: PURCHASE['015'], success: false });    
    }        
}