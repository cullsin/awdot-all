import moment from 'moment';
import { createProfile, 
         findByUser, 
         updateProfile } from '../models/profile.model.js';
import { errorCodes } from '../../common/errors/errorCodes.js';
const { PROFILE } = errorCodes;
export async function doInsert(req, res, next) {
    const result = await createProfile(req.body);
    if(result._id) {
        res.status(200).send({ success: true, profile:result, code:'007', message: PROFILE['007'] });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '004', message: PROFILE['004'], success: false });    
    }
}

export async function doUser(req, res) {
    const { user_id } = req.body;
    const result = await findByUser(user_id);
    if(result.length > 0 && result[0].id) {
        res.status(200).send({success : true, profile: result[0] });       
    } else {
        res.status(200).send({ code: '005', message:PROFILE['005'], success: true, profile: {} });           
    }
}

export async function doUpdate(req, res) {
    const updated = await updateProfile(req.body);
    if(updated._id) {
        res.status(200).send({ success: true, profile:updated, code:'008', message: PROFILE['008'] });    
    } else {
        res.status(200).send({ error: JSON.stringify(updated), code: 'PAY006', message:PROFILE.PAY006, success: false });           
    }
}
