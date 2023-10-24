import { 
    createProdPartners,
    createclients,
    getClientsById,
    getClientsByCreated,
    updateProdPartners,
    getClients,
    getProdPartners,
} from '../models/clients.model.js';
import { errorCodes } from '../../common/errors/errorCodes.js';
const { CLIENTS } = errorCodes;
import sgMail from '@sendgrid/mail';
import DotEnv from 'dotenv';
DotEnv.config();

export async function doInsert(req, res) {
    const data = {
        partners_id: req.body.partners_id,
        clients_id: req.body.clients_id
    }
    const cresult = await createProdPartners(data);
    if(cresult._id) {
        res.status(200).send({ code: '007', message: CLIENTS['007'], success: true });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '008', message: CLIENTS['008'], success: false });
    }        
}

export async function doGet(req, res) {
    const { clients_id } = req.body;
    const result = await getClientsById(partners_id);
    if(result._id) {
        res.status(200).send({ code: '009', message: CLIENTS['009'], success: true, company:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '010', message: CLIENTS['010'], success: false });           
    }
}

export async function doPartners(req, res) {
    const { partners_id } = req.body;
    let result = await getProdPartners(partners_id);
    if(result.length > 0) {
        for(let index = 0; index < result.length; index++) {
            const object = result[index].toJSON();
            result[index] = object;
        }
        res.status(200).send({ code: '011', message: CLIENTS['011'], success: true, partners:result });  
    } else if(result.length === 0) {
        res.status(200).send({ code: '011', message: CLIENTS['011'], success: true, partners:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '012', message: CLIENTS['012'], success: false });           
    }
}

export async function doRemove(req, res) {
    const result = await updateProdPartners(req.body);
    if(result._id) {
        res.status(200).send({ code: '013', message: CLIENTS['013'], success: true, partners:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '014', message: CLIENTS['014'], success: false });    
    }        
}

export async function doList(req, res) {
    const result = await getClients();
    if(result.length) {
        res.status(200).send({ code: '015', message: CLIENTS['015'], success: true, partnersList:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '016', message: CLIENTS['016'], success: false, partnersList:result });           
    }
}

