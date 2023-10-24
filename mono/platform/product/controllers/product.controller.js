import { 
    createProdCompanies,
    createproduct,
    getProductById,
    getProductByCreated,
    updateProdCompanies,
    getProduct,
    getProdCompanies,
} from '../models/product.model.js';
import { errorCodes } from '../../common/errors/errorCodes.js';
const { PRODUCT } = errorCodes;
import sgMail from '@sendgrid/mail';
import DotEnv from 'dotenv';
DotEnv.config();

export async function doInsert(req, res) {
    const result = await createproduct(req.body);
    if(result._id) {
        const data = {
            companies_id: req.body.companies_id,
            product_id: result._id
        }
        const cresult = await createProdCompanies(data);
        if(cresult._id) {
            res.status(200).send({ code: '007', message: PRODUCT['007'], success: true });
        } else {
            res.status(200).send({ error: JSON.stringify(result), code: '008', message: PRODUCT['008'], success: false });
        }
    }        
}

export async function doGet(req, res) {
    const { product_id } = req.body;
    const result = await getProductById(companies_id);
    if(result._id) {
        res.status(200).send({ code: '009', message: PRODUCT['009'], success: true, company:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '010', message: PRODUCT['010'], success: false });           
    }
}

export async function doCompanies(req, res) {
    const { companies_id } = req.body;
    let result = await getProdCompanies(companies_id);
    if(result.length > 0) {
        for(let index = 0; index < result.length; index++) {
            const object = result[index].toJSON();
            object.category = await getProductById(result[index].product_id);
            result[index] = object;
        }
        res.status(200).send({ code: '011', message: PRODUCT['011'], success: true, companies:result });  
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '012', message: PRODUCT['012'], success: false });           
    }
}

export async function doRemove(req, res) {
    const result = await updateProdCompanies(req.body);
    if(result._id) {
        res.status(200).send({ code: '013', message: PRODUCT['013'], success: true, companies:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '014', message: PRODUCT['014'], success: false });    
    }        
}

export async function doList(req, res) {
    const result = await getProduct();
    if(result.length) {
        res.status(200).send({ code: '015', message: PRODUCT['015'], success: true, companiesList:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '016', message: PRODUCT['016'], success: false, companiesList:result });           
    }
}

