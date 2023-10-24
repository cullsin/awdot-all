import { createTransaction, 
    getTransactionById,
    getTransactionByCreated
} from '../models/transaction.model.js';
import { web3SendTransaction
} from '../../wallet/models/wallet.model.js';

import {
    findByUser
} from '../../profile/models/profile.model.js'
import { errorCodes } from '../../common/errors/errorCodes.js';
import { emitter } from '../../common/services/event.service.js';
const { TRANSACTION } = errorCodes;

export async function doInsert(req, res) {
    let result = req.body;
    const from_profiles = await findByUser(req.body.from_id);
    const to_profiles = await findByUser(req.body.to_id);
    result.from_web3_wallet = from_profiles[0].web3_wallet;
    result.to_web3_wallet = to_profiles[0].web3_wallet;
    result.wallet_key = from_profiles[0].wallet_key;
    let solve = await web3SendTransaction(result);
    if(solve.transfer_hash) {
        result.transfer_hash = solve.transfer_hash;
        const records = await createTransaction(result);    
        if(records._id) {
            res.status(200).send({ code: '007', message: TRANSACTION['007'], success: true, transaction:records });
        } else {
            res.status(200).send({ error: JSON.stringify(result), code: '008', message: TRANSACTION['008'], success: false });    
        }
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '008', message: TRANSACTION['008'], success: false });    
    }        
}

export async function doGet(req, res) {
    const { transaction_id } = req.body;
    const result = await getTransactionById(transaction_id);
    if(result._id) {
        res.status(200).send({ code: '009', message: TRANSACTION['009'], success: true, transaction:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '010', message: TRANSACTION['010'], success: false });           
    }
}

export async function doUser(req, res) {
    const { created_by } = req.body;
    const result = await getTransactionByCreated(created_by);
    if(result.length) {
        res.status(200).send({ code: '011', message: TRANSACTION['011'], success: true, transactions:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '012', message: TRANSACTION['012'], success: false });           
    }
}
