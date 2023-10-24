import { 
    getCompanies,
    createCompanies
} from '../models/index.js';
import { errorCodes } from '../../common/errors/errorCodes.js';
const { COMPANIES } = errorCodes;
import sgMail from '@sendgrid/mail';
import DotEnv from 'dotenv';
DotEnv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function doSearch(req, res) {
    const result = await getCompanies(req.body);
    const data = result.data.data || []; 
    if(data.length) {
        res.status(200).send({ code: '017', message: COMPANIES['017'], success: true, companies:data });
    } else {
        res.status(200).send({ code: '018', message: COMPANIES['018'], success: false, companies:data || [] });           
    }
}

export async function doMail(req, res) {
    const {name, user_name} = req.body;
    const result = await createCompanies(req.body);
    if(result._id) {
        const msg = {
            to: 'one+awdot@lab63.org',
            from: 'cullsin@gmail.com',
            subject: `Company: ${name} Requested By ${user_name}`,
            html: `Hi<br/>We got a new request to enable the company ${name} <br/> Thanks <br/>Customer Request`
        }
        const mailResponse = sgMail.send(msg);    
        res.status(200).send({ code: '007', message: COMPANIES['007'], success: true, companies:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '008', message: COMPANIES['008'], success: false });    
    }
}