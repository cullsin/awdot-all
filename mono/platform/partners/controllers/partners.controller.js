import { createPartners, 
    getPartnersById,
    getPartnersByCreated,
    updatePartners,
    getPartners
} from '../models/partners.model.js';
import { errorCodes } from '../../common/errors/errorCodes.js';
const { PARTNERS } = errorCodes;
import sgMail from '@sendgrid/mail';
import DotEnv from 'dotenv';
DotEnv.config();

export async function doInsert(req, res) {
    const result = await createPartners(req.body);
    if(result._id) {
        res.status(200).send({ code: '007', message: PARTNERS['007'], success: true, partners:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '008', message: PARTNERS['008'], success: false });    
    }        
}

export async function doGet(req, res) {
    const { partners_id } = req.body;
    const result = await getPartnersById(partners_id);
    if(result._id) {
        res.status(200).send({ code: '009', message: PARTNERS['009'], success: true, partners:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '010', message: PARTNERS['010'], success: false });           
    }
}

export async function doUser(req, res) {
    const { created_by } = req.body;
    const result = await getPartnersByCreated(created_by);
    if(result.length) {
        res.status(200).send({ code: '011', message: PARTNERS['011'], success: true, partnerss:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '012', message: PARTNERS['012'], success: false });           
    }
}

export async function doRemove(req, res) {
    const result = await updatePartners(req.body);
    if(result._id) {
        res.status(200).send({ code: '013', message: PARTNERS['013'], success: true, partners:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '014', message: PARTNERS['014'], success: false });    
    }        
}

export async function doInterested(req, res) {
    const result = await updatePartners(req.body);
    if(result._id) {
        res.status(200).send({ code: '015', message: PARTNERS['015'], success: true, partners:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '016', message: PARTNERS['016'], success: false });    
    }        
}

export async function doList(req, res) {
    const result = await getPartners();
    if(result.length) {
        res.status(200).send({ code: '017', message: PARTNERS['017'], success: true, partnersList:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '018', message: PARTNERS['018'], success: false, partnersList:result });           
    }
}

export async function doUpdate(req, res) {
    const result = await updatePartners(req.body);
    if(result._id) {
        res.status(200).send({ code: '019', message: PARTNERS['019'], success: true, partners:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '020', message: PARTNERS['020'], success: false });    
    }        
}

export async function doMail(req, res) {
    const {name, short_name, about, phone, email, phoneCode} = req.body;
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to: 'cullsin@gmail.com',
        from: 'cullsin@gmail.com',
        subject: `${email} - ${phone} - ${phoneCode}`,
        html: `${about}`
    }
    const mailResponse = sgMail.send(msg);
    res.status(200).send({success : true, code: 'PAY021', message:PARTNERS['021'], mail: mailResponse });
}