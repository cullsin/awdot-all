import { createDomain, 
    getDomainById,
    getDomainByCreated,
    updateDomain,
    getDomains,
    getType
} from '../models/domain.model.js';
import { errorCodes } from '../../common/errors/errorCodes.js';
const { DOMAIN } = errorCodes;

export async function doInsert(req, res) {
    const data = req.body;
    data.created_by = data.user_id; 
    const result = await createDomain(data);
    if(result._id) {
        res.status(200).send({ code: '007', message: DOMAIN['007'], success: true, domain:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '008', message: DOMAIN['008'], success: false });    
    }        
}

export async function doGet(req, res) {
    const { domain_id } = req.body;
    const result = await getDomainById(domain_id);
    if(result._id) {
        res.status(200).send({ code: '009', message: DOMAIN['009'], success: true, domain:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '010', message: DOMAIN['010'], success: false });           
    }
}

export async function doUser(req, res) {
    const { created_by } = req.body;
    const result = await getDomainByCreated(created_by);
    if(result.length) {
        res.status(200).send({ code: '011', message: DOMAIN['011'], success: true, domains:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '012', message: DOMAIN['012'], success: false });           
    }
}

export async function doRemove(req, res) {
    const result = await updateDomain(req.body);
    if(result._id) {
        res.status(200).send({ code: '013', message: DOMAIN['013'], success: true, domain:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '014', message: DOMAIN['014'], success: false });    
    }        
}

export async function doType(req, res) {
    const result = await getType(req.body.type_id);
    if(result && result._id) {
        res.status(200).send({ code: '015', message: DOMAIN['015'], success: true, domain:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '016', message: DOMAIN['016'], success: false });    
    }        
}

export async function doList(req, res) {
    const result = await getDomains();
    if(result.length) {
        res.status(200).send({ code: '017', message: DOMAIN['017'], success: true, domains:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '018', message: DOMAIN['018'], success: false, domains:[] });           
    }
}

export async function doUpdate(req, res) {
    const data = req.body;
    data.created_by = data.user_id; 
    const result = await updateDomain(data);
    if(result._id) {
        res.status(200).send({ code: '019', message: DOMAIN['019'], success: true, domain:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '020', message: DOMAIN['020'], success: false });    
    }        
}