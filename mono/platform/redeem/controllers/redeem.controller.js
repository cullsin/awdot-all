import { createRedeem, 
    getRedeemById,
    getRedeemByCreated,
    updateRedeem
} from '../models/redeem.model.js';
import { errorCodes } from '../../common/errors/errorCodes.js';
import { emitter } from '../../common/services/event.service.js';
const { REDEEM } = errorCodes;

export async function doInsert(req, res) {
    const result = await createRedeem(req.body);
    if(result._id) {
        res.status(200).send({ code: '007', message: REDEEM['007'], success: true, redeem:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '008', message: REDEEM['008'], success: false });    
    }        
}

export async function doGet(req, res) {
    const { redeem_id } = req.body;
    const result = await getRedeemById(redeem_id);
    if(result._id) {
        res.status(200).send({ code: '009', message: REDEEM['009'], success: true, redeem:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '010', message: REDEEM['010'], success: false });           
    }
}

export async function doUser(req, res) {
    const { created_by } = req.body;
    const result = await getRedeemByCreated(created_by);
    if(result && result.length >= 0) {
        res.status(200).send({ code: '011', message: REDEEM['011'], success: true, redeems:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '012', message: REDEEM['012'], success: false });           
    }
}

export async function doUpdate(req, res) {
    const result = await updateRedeem(req.body);
    if(result._id) {
        if (result.is_active === true) {
            const ev = emitter.emit('EventWalletUpdate', result);
        }
        res.status(200).send({ code: '014', message: REDEEM['014'], success: true, redeem:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '015', message: REDEEM['015'], success: false });    
    }        
}

export async function doFee(req, res) {
    const fee = {
        transactionFee : process.env.transactionFee
    }    
    res.status(200).send({ code: '013', message: REDEEM['013'], success: true, fee });        
}