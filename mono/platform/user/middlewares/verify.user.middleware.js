import { errorCodes } from '../../common/errors/errorCodes.js';
import { findByEmail } from '../models/user.model.js';
const { USER } = errorCodes;
export const _validateFields = (validation, req, res, next) => {
    let errors = [];
    if (req.body) {
        validation.fields.forEach((item) => {
            if(!req.body[item] || 
                req.body[item].toString().trim() === null || 
                req.body[item] === "undefined" || 
                req.body[item].toString().trim() === '') {
                    errors.push(item);
            }
        });
        if (errors.length > 0) {
            return res.status(200).send({
                success: false,
                code: validation.errorCode, 
                message: USER[validation.errorCode],
                errors: errors.join(',') 
            });
        } else {
            return next();
        }
    } else {
        return res.status(200).send({
                success: false,
                code: 'PAY006', 
                message: PAY006
        });
    }
}

export function hasUserValidFields(req, res, next) {
    const validation = {
        fields : ['firstName', 'lastName', 'email', 'password', 'phone'],
        errorCode: 'PAY005'
    }
    return _validateFields(validation, req, res, next);
}    
    
export function hasUserValidGenerateOtpFields(req, res, next) {
    const validation = {
        fields : ['user_id'],
        errorCode: 'PAY030'
    }
    return _validateFields(validation, req, res, next);
}

export function hasUserValidOtpFields(req, res, next) {
    const validation = {
        fields : ['user_id', 'otp'],
        errorCode: 'PAY017'
    }
    return _validateFields(validation, req, res, next);
}

export function hasUserValidUserFields(req, res, next) {
    const validation = {
        fields : ['user_id'],
        errorCode: 'PAY023'
    }
    return _validateFields(validation, req, res, next);
}

export function hasUserValidEmailFields(req, res, next) {
    const validation = {
        fields : ['remote_email'],
        errorCode: 'PAY063'
    }
    return _validateFields(validation, req, res, next);
}

export function hasUserValidUpdateFields(req, res, next) {
    const validation = {
        fields : ['user_id', 'firstName', 'lastName', 'email', 'phone'],
        errorCode: 'PAY025'
    }
    return _validateFields(validation, req, res, next);
}

export function hasUserValidForgetFields(req, res, next) {
    const validation = {
        fields : ['email'],
        errorCode: 'PAY020'
    }
    return _validateFields(validation, req, res, next);
}

export function hasUserValidChangePasswordFields(req, res, next) {
    const validation = {
        fields : ['password', 'email'],
        errorCode: 'PAY028'
    }
    return _validateFields(validation, req, res, next);
}

export async function isEmailExists(req, res, next) {
    const { email } = req.body;
    const result = await findByEmail(email);
    if(result.length === 0) {
        return next();
    } else {
        return res.status(200).send({
            success: false,
            code: 'PAY010', 
            message: USER.PAY010
        });
    }
}

export async function isEmailAvailable(req, res, next) {
    const { email } = req.body;
    const result = await findByEmail(email);
    if(result.length === 0) {
        return res.status(200).send({
            success: false,
            code: 'PAY022', 
            message: USER['PAY022']
        });
    } else {
        return next();
    }
}

export async function isDuplicateEmail(req, res, next) {
    const { email, user_id } = req.body;
    const result = await findByEmail(email);
    const user = result[0];
    if(result.length === 0) {
        return next();
    } else if(user_id === user._id) {
        return next();
    } else {
        return res.status(200).send({
            success: false,
            code: 'PAY027', 
            message: PAY027
        });
    }
}

export function hasUserValidBuyerFields(req, res, next) {
    const validation = {
        fields : ['buyer_user_id'],
        errorCode: 'PAY043'
    }
    return _validateFields(validation, req, res, next);
}

export function hasUserValidSellerFields(req, res, next) {
    const validation = {
        fields : ['seller_user_id'],
        errorCode: 'PAY044'
    }
    return _validateFields(validation, req, res, next);
}

export function hasUserValidMessageFields(req, res, next) {
    const validation = {
        fields : ['message_user_id'],
        errorCode: 'PAY079'
    }
    return _validateFields(validation, req, res, next);
}

