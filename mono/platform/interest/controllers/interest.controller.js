import { 
    createCatPartners,
    createinterest,
    getInterestById,
    getInterestByCreated,
    updateCatPartners,
    getInterest,
    getCatPartners,
} from '../models/interest.model.js';
import { errorCodes } from '../../common/errors/errorCodes.js';
const { INTEREST } = errorCodes;
import sgMail from '@sendgrid/mail';
import DotEnv from 'dotenv';
DotEnv.config();

export async function doInsert(req, res) {
    const result = await createinterest(req.body);
    if(result._id) {
        const data = {
            partners_id: req.body.partners_id,
            interest_id: result._id
        }
        const cresult = await createCatPartners(data);
        if(cresult._id) {
            res.status(200).send({ code: '007', message: INTEREST['007'], success: true });
        } else {
            res.status(200).send({ error: JSON.stringify(result), code: '008', message: INTEREST['008'], success: false });
        }
    }        
}

export async function doGet(req, res) {
    const { interest_id } = req.body;
    const result = await getInterestById(partners_id);
    if(result._id) {
        res.status(200).send({ code: '009', message: INTEREST['009'], success: true, company:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '010', message: INTEREST['010'], success: false });           
    }
}

export async function doPartners(req, res) {
    const { partners_id } = req.body;
    const result = await getCatPartners(partners_id);
    if(result.length > 0) {
        for(let index = 0; index < result.length; index++) {
            const object = result[index].toJSON();
            object.category = await getInterestById(result[index].interest_id);
            result[index] = object;
        }
        res.status(200).send({ code: '011', message: INTEREST['011'], success: true, partners: result });  
    } else if (result.length === 0 ) {
        res.status(200).send({ code: '011', message: INTEREST['011'], success: true, partners: result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '012', message: INTEREST['012'], success: false });           
    }
}

export async function doRemove(req, res) {
    const result = await updateCatPartners(req.body);
    if(result._id) {
        res.status(200).send({ code: '013', message: INTEREST['013'], success: true, partners:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '014', message: INTEREST['014'], success: false });    
    }        
}

export async function doList(req, res) {
    const result = await getInterest();
    if(result.length) {
        res.status(200).send({ code: '015', message: INTEREST['015'], success: true, partnersList:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '016', message: INTEREST['016'], success: false, partnersList:result });           
    }
}

