import { createInvestment, 
    getInvestmentById,
    getInvestmentByCreated,
    updateInvestment,
    getInvestments
} from '../models/investment.model.js';
import { errorCodes } from '../../common/errors/errorCodes.js';
const { INVESTMENT } = errorCodes;

export async function doInsert(req, res) {
    const result = await createInvestment(req.body);
    if(result._id) {
        res.status(200).send({ code: '007', message: INVESTMENT['007'], success: true, investment:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '008', message: INVESTMENT['008'], success: false });    
    }        
}

export async function doGet(req, res) {
    const { investment_id } = req.body;
    const result = await getInvestmentById(investment_id);
    if(result._id) {
        res.status(200).send({ code: '009', message: INVESTMENT['009'], success: true, investment:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '010', message: INVESTMENT['010'], success: false });           
    }
}

export async function doUser(req, res) {
    const { created_by } = req.body;
    const result = await getInvestmentByCreated(created_by);
    if(result.length) {
        res.status(200).send({ code: '011', message: INVESTMENT['011'], success: true, investments:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '012', message: INVESTMENT['012'], success: false });           
    }
}

export async function doRemove(req, res) {
    const result = await updateInvestment(req.body);
    if(result._id) {
        res.status(200).send({ code: '013', message: INVESTMENT['013'], success: true, investment:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '014', message: INVESTMENT['014'], success: false });    
    }        
}

export async function doInterested(req, res) {
    const result = await updateInvestment(req.body);
    if(result._id) {
        res.status(200).send({ code: '015', message: INVESTMENT['015'], success: true, investment:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '016', message: INVESTMENT['016'], success: false });    
    }        
}

export async function doList(req, res) {
    const result = await getInvestments(req.body.user_id);
    if(result.length) {
        res.status(200).send({ code: '017', message: INVESTMENT['017'], success: true, investments:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '018', message: INVESTMENT['018'], success: false, investments:[] });           
    }
}

export async function doUpdate(req, res) {
    const result = await updateInvestment(req.body);
    if(result._id) {
        res.status(200).send({ code: '019', message: INVESTMENT['019'], success: true, investment:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '020', message: INVESTMENT['020'], success: false });    
    }        
}