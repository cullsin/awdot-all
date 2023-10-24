import fs from 'fs';
import moment from 'moment';
import multer from 'multer';
import { createFile, 
    getFileById,
    removeFile
} from '../models/file.model.js';
import { errorCodes } from '../../common/errors/errorCodes.js';
import DotEnv from 'dotenv';
DotEnv.config();
import Stripe from 'stripe';
const stripe = new Stripe(process.env.stripeSecretKey);
const { FILE } = errorCodes;
export async function doInsert(req, res) {
    if(!req.files) {
        res.status(200).send({ error: JSON.stringify(result), code: '015', message: FILE['015'], success: false });
    }   
    const {genericFile} = req.files;
    const category = req.body.category;
    const file = {
        name: genericFile.name,
        type: genericFile.mimetype,
        size: genericFile.size,
        title: req.body.title,
        created_by: req.body.user_id,
        time: moment().unix(),
        category 
    }
    genericFile.mv(`${process.env.uploadPath}/${file.time}/${genericFile.name}`);
    let stripeFile = await stripe.files.create({
        purpose: category === 'user-identity' ? 'identity_document' : 'additional_verification',
        file: {
            data: genericFile.data,
            name: genericFile.name,
            type: 'application/pdf',
        }
    });
    if(stripeFile.id) {
        file.file_stripe_id = stripeFile.id; 
        file.stripe = stripeFile;
        const result = await createFile(file);
        if(result._id) {     
            res.status(200).send({ success: true, file:result });
        } else {
            res.status(200).send({ error: result, code: '008', message: FILE['008'], success: false });    
        }
    } else {
        res.status(200).send({ error: stripeFile, code: '016', message: FILE['016'], success: false });    
    }        
}

export async function doGet(req, res) {
    const { file_id } = req.body;
    const result = await getFileById(file_id);
    if(result._id) {
        res.status(200).send({ code: '009', message: FILE['009'], success: true, file:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '010', message: FILE['010'], success: false });           
    }
}

export async function doRemove(req, res) {
    const result = await removeFile(req.body);
    if(result._id) {
        res.status(200).send({ code: '013', message: FILE['013'], success: true, file:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '014', message: FILE['014'], success: false });    
    }        
}
