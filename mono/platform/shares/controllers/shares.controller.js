import { createShares, 
    getSharesById,
    getSharesByCreated,
    getSharesByCompanies,
    updateShares,
    updateSharesCount
} from '../models/shares.model.js';
import { createBought, getSharesByInvestment } from '../models/owner.model.js';
import { errorCodes } from '../../common/errors/errorCodes.js';
const { SHARES } = errorCodes;

export async function doInsert(req, res) {
    const result = await createShares(req.body);
    if(result._id) {
        res.status(200).send({ code: '007', message: SHARES['007'], success: true, share:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '008', message: SHARES['008'], success: false });    
    }        
}

export async function doCompany(req, res) {
    const { companies_id, user_id } = req.body;
    const result = await getSharesByCompanies(companies_id, user_id);
    if(result.length && result[0].companies_id) {
        res.status(200).send({ code: '020', message: SHARES['020'], success: true, share:result[0] });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '021', message: SHARES['021'], success: false });           
    }
}

export async function doInvestment(req, res) {
    const { investment_id, user_id } = req.body;
    const result = await getSharesByInvestment(investment_id, user_id);
    if(result.length) {
        res.status(200).send({ code: '022', message: SHARES['022'], success: true, shares:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '023', message: SHARES['023'], success: false});           
    }
}

export async function doGet(req, res) {
    const { shares_id } = req.body;
    const result = await getSharesById(shares_id);
    if(result._id) {
        res.status(200).send({ code: '009', message: SHARES['009'], success: true, shares:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '010', message: SHARES['010'], success: false });           
    }
}

export async function doUser(req, res) {
    const { created_by } = req.body;
    const result = await getSharesByCreated(created_by);
    if(result && result.length >= 0) {
        res.status(200).send({ code: '011', message: SHARES['011'], success: true, shares:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '012', message: SHARES['012'], success: false });           
    }
}

export async function doUpdate(req, res) {
    const result = await updateShares(req.body);
    if(result._id) {
        res.status(200).send({ code: '013', message: SHARES['013'], success: true, shares:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '014', message: SHARES['014'], success: false });    
    }        
}

export async function doUpdateCount(req, res) {
    const result = await updateSharesCount(req.body);
    if(result._id) {
        res.status(200).send({ code: '024', message: SHARES['024'], success: true, shares:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '025', message: SHARES['025'], success: false });    
    }        
}

/* Assign to Investment Portfolio is check if required and do after sometime */
export async function doBought(req, res) {
    req.body['shares_id'] = req.body.to_shares_id;
    const result = await createBought(req.body);
    if(result._id) {
        res.next();
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '017', message: SHARES['017'], success: false });    
    }        
}