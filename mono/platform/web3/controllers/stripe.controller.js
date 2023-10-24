import fs from 'fs';
import moment from 'moment';
import { errorCodes } from '../../common/errors/errorCodes.js';
import { updateBank } from '../../bank/models/bank.model.js';
import { saveStripe, getStripeByPurchaseAndPayIntent } from '../models/stripe.model.js';
import DotEnv from 'dotenv';
DotEnv.config();
import Stripe from 'stripe';
const { STRIPE } = errorCodes;
const stripe = new Stripe(process.env.stripeSecretKey);
export async function generateStripeClientKey(req, res, next) {
    const { firstName, lastName, 
            email, city, country, phone,
            line1, line2, postal_code, state } = req.body;
    try {
    const customer = await stripe.customers.create({
        address: {
            city, country, line1, line2, postal_code, state
        },
        email,
        name: firstName + ' ' + lastName,
        phone,
    });
    const ephemeralKey = await stripe.ephemeralKeys.create(
        {customer: customer.id},
        {apiVersion: '2020-08-27'}
    );    
    const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(Number(req.body.amount.toFixed(2)) * 100),
        currency: req.body.currency,
        description: `This payment for ${req.body.purchase_id}`,
        customer: customer.id,
        metadata: {'purchase_id': req.body.purchase_id},
        automatic_payment_methods: {
            enabled: true,
        },
    });

    res.status(200).send({ success : true, 
        stripeInstance: paymentIntent, 
        ephemeralKey: ephemeralKey.secret,
        customer: customer.id
    });
    
    } catch (e) {
        console.log(e);
    }
}

export async function stripeReturnRequest(req, res, next) {
    const {purchase_id, payment_intent, user_id} = req.body;
    const isExists = await getStripeByPurchaseAndPayIntent(purchase_id, payment_intent);
    if(!isExists) { 
        const paymentIntent = await stripe.paymentIntents.retrieve(
            req.body.payment_intent
        );      
        await saveStripe({
            connect_id: purchase_id,
            connect_type: 'purchase',
            payment_intent,
            stripe_status: paymentIntent.status,
            created_by: user_id
        });
    }
    res.status(200).send({ success : true });
}

export async function doTransfer(req, res, next) {
    const { profile, file, redeem, bank, user } = req.body;
    
    let dob = moment(profile.dateOfBirth).format('YYYY-MM-DD');
    dob = dob.split('-');
    const getAccount = await stripe.accounts.retrieve(
        bank.account_id
    );
    const amount = Math.round(redeem.total_amount) * 100;
    if(getAccount.capabilities && getAccount.capabilities.transfers === 'active') {
        try {
            const transfer = await stripe.transfers.create({
                amount,
                currency: bank.bank_currency,
                destination: bank.account_id,
                transfer_group: 'ONLINE-WEB',
            });    
            await saveStripe({
                connect_id: transfer.id,
                connect_type: 'redeem',
                stripe_status: transfer.id ? 'success' : 'failure',
                created_by: user.user_id
            });
            res.status(200).send({ success : true, transfer });
        } catch (e) {
            res.status(200).send({ success : false });
        }
    } else {
        if(bank.account_id_updated === false) {
            const account = await stripe.accounts.update(
                bank.account_id,
                {
                email: user.email,
                business_type: 'individual',
                business_profile: {
                    name: bank.bank_account_name,
                    mcc: 5734,
                    url: 'https://eskros.com'
                },
                individual: {
                    verification: {
                        document: {
                            front: file.file.file_stripe_id
                        }
                    },
                    id_number: profile.gov_id,
                    first_name: user.firstName,
                    last_name: user.lastName,
                    ssn_last_4: bank.bank_country === 'US' ? profile.gov_id.substr(profile.gov_id.length - 4) : undefined,
                    dob: {
                        day: dob[2],
                        month: dob[1],
                        year: dob[0]
                    },
                    email: user.email,
                    gender: profile.gender.toLowerCase(),
                    phone: user.phone,
                    address: {
                        city: profile.city,
                        state: profile.state,
                        country: profile.country,
                        postal_code: profile.postal_code,
                        line1: profile.line1,
                        line2: profile.line2
                    }
                }
            });
            let bankData = bank;
            bankData.account_id_updated = true;
            await updateBank(bankData);
            res.status(200).send({ code: '083', message: STRIPE['083'], success: true });
        } 
        res.status(200).send({ code: '084', message: STRIPE['084'], success: false });   
    }          
}