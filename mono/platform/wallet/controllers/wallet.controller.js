import { createWallet, 
    getWalletByCreated,
    updateWallet
} from '../models/wallet.model.js';
import {
    findByUser
} from '../../profile/models/profile.model.js'
import { errorCodes } from '../../common/errors/errorCodes.js';
const { WALLET } = errorCodes;

export async function doInsert(req, res) {
    const result = await createWallet(req.body);
    if(result._id) {
        res.status(200).send({ code: '007', message: WALLET['007'], success: true, wallet:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '008', message: WALLET['008'], success: false });    
    }        
}

export async function doUser(req, res) {
    const { created_by } = req.body;
    const profiles = await findByUser(created_by);
    const result = await getWalletByCreated(created_by, profiles[0].web3_wallet);
    const def = {balance: 0};
    if(result && result.balance) {
        res.status(200).send({ code: '011', message: WALLET['011'], success: true, wallet:result });
    } else {
        res.status(200).send({ code: '011', message: WALLET['011'], success: true, wallet:def });           
    }
}

export async function doUpdate(req, res) {
    const result = await updateWallet(req.body);
    if(result._id) {
        res.status(200).send({ code: '013', message: WALLET['013'], success: true, wallet:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '014', message: WALLET['014'], success: false });    
    }        
}
