import DotEnv from 'dotenv';
DotEnv.config();
import { errorCodes } from '../../common/errors/errorCodes.js';
import { findByUser, remove, createBank } from '../models/bank.model.js';
import moment from 'moment';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.stripeSecretKey);
const { BANK } = errorCodes;
export async function doInsert(req, res, next) {
    let account;
    try {
        account = await stripe.accounts.create({
            type: 'custom',
            country: req.body.bank_country,
            capabilities:  req.body.bank_country === 'US' ?  {
              card_payments: {requested: true},
              transfers: {requested: true}
            } : {
                transfers: {requested: true}
            },
            external_account: {
                object:'bank_account',
                country: req.body.bank_country,
                currency: req.body.bank_currency,
                account_number: req.body.bank_account_no,
                routing_number: req.body.branch_id
            },
            tos_acceptance: {
                date: moment().unix(),
                ip: '49.37.205.72',
                service_agreement: req.body.bank_country !== 'US' ? 'recipient' : 'full' 
            }
        });
    } catch (error) {
        res.status(200).send({ error, code: 'PAY089', message: BANK.PAY089, success: false });
    }
    req.body['account_id'] =  account.id;
    const result = await createBank(req.body);
    if(result._id) {
        const object = {};
        object.success = true;
        object.code = 'PAY090';
        object.message = BANK.PAY090;
        object.bank = result;
        res.status(200).send(object);
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: 'PAY088', message: BANK.PAY088, success: false });    
    }
}

export async function getBanksByUser(req, res, next) {
    const banks = await findByUser(req.body.user_id);
    res.status(200).send({ success : true, banks, code: 'PAY091', message: BANK.PAY091 });
}

export async function removeBankById(req, res, next) {
    try {
        const result = await remove(req.body);
        if(result && result.is_deleted === true) {
            res.status(200).send({ success : true, message: result, code: 'PAY092', message: BANK.PAY092 });
        }
    } catch(error) {
        res.status(200).send({ error, code: 'PAY087', message: BANK.PAY087, success: false });
    }   
}