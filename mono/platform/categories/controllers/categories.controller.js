import { 
    createCatCompanies,
    createcategories,
    getCategoriesById,
    getCategoriesByCreated,
    updateCatCompanies,
    getCategories,
    getCatCompanies,
} from '../models/categories.model.js';
import { errorCodes } from '../../common/errors/errorCodes.js';
const { CATEGORIES } = errorCodes;
import sgMail from '@sendgrid/mail';
import DotEnv from 'dotenv';
DotEnv.config();

export async function doInsert(req, res) {
    const result = await createcategories(req.body);
    if(result._id) {
        const data = {
            companies_id: req.body.companies_id,
            categories_id: result._id
        }
        const cresult = await createCatCompanies(data);
        if(cresult._id) {
            res.status(200).send({ code: '007', message: CATEGORIES['007'], success: true });
        } else {
            res.status(200).send({ error: JSON.stringify(result), code: '008', message: CATEGORIES['008'], success: false });
        }
    }        
}

export async function doGet(req, res) {
    const { categories_id } = req.body;
    const result = await getCategoriesById(companies_id);
    if(result._id) {
        res.status(200).send({ code: '009', message: CATEGORIES['009'], success: true, company:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '010', message: CATEGORIES['010'], success: false });           
    }
}

export async function doCompanies(req, res) {
    const { companies_id } = req.body;
    const result = await getCatCompanies(companies_id);
    if(result.length > 0) {
        for(let index = 0; index < result.length; index++) {
            const object = result[index].toJSON();
            object.category = await getCategoriesById(result[index].categories_id);
            result[index] = object;
        }
        res.status(200).send({ code: '011', message: CATEGORIES['011'], success: true, companies: result });  
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '012', message: CATEGORIES['012'], success: false });           
    }
}

export async function doRemove(req, res) {
    const result = await updateCatCompanies(req.body);
    if(result._id) {
        res.status(200).send({ code: '013', message: CATEGORIES['013'], success: true, companies:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '014', message: CATEGORIES['014'], success: false });    
    }        
}

export async function doList(req, res) {
    const result = await getCategories();
    if(result.length) {
        res.status(200).send({ code: '015', message: CATEGORIES['015'], success: true, companiesList:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '016', message: CATEGORIES['016'], success: false, companiesList:result });           
    }
}

