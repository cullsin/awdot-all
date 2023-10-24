import { createCompanies, 
    getCompaniesById,
    getCompaniesByCreated,
    updateCompanies,
    getCompanies
} from '../models/companies.model.js';
import { errorCodes } from '../../common/errors/errorCodes.js';
const { COMPANIES } = errorCodes;
import sgMail from '@sendgrid/mail';
import DotEnv from 'dotenv';
DotEnv.config();

export async function doInsert(req, res) {
    const result = await createCompanies(req.body);
    if(result._id) {
        res.status(200).send({ code: '007', message: COMPANIES['007'], success: true, company:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '008', message: COMPANIES['008'], success: false });    
    }        
}

export async function doGet(req, res) {
    const { companies_id } = req.body;
    const result = await getCompaniesById(companies_id);
    if(result._id) {
        res.status(200).send({ code: '009', message: COMPANIES['009'], success: true, company:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '010', message: COMPANIES['010'], success: false });           
    }
}

export async function doUser(req, res) {
    const { created_by } = req.body;
    const result = await getCompaniesByCreated(created_by);
    if(result.length) {
        res.status(200).send({ code: '011', message: COMPANIES['011'], success: true, companiess:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '012', message: COMPANIES['012'], success: false });           
    }
}

export async function doRemove(req, res) {
    const result = await updateCompanies(req.body);
    if(result._id) {
        res.status(200).send({ code: '013', message: COMPANIES['013'], success: true, companies:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '014', message: COMPANIES['014'], success: false });    
    }        
}

export async function doInterested(req, res) {
    const result = await updateCompanies(req.body);
    if(result._id) {
        res.status(200).send({ code: '015', message: COMPANIES['015'], success: true, companies:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '016', message: COMPANIES['016'], success: false });    
    }        
}

export async function doList(req, res) {
    const result = await getCompanies();
    if(result.length) {
        res.status(200).send({ code: '017', message: COMPANIES['017'], success: true, companiesList:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '018', message: COMPANIES['018'], success: false, companiesList:result });           
    }
}

export async function doUpdate(req, res) {
    const result = await updateCompanies(req.body);
    if(result._id) {
        res.status(200).send({ code: '019', message: COMPANIES['019'], success: true, companies:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '020', message: COMPANIES['020'], success: false });    
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
    res.status(200).send({success : true, code: 'PAY021', message:COMPANIES['021'], mail: mailResponse });
}