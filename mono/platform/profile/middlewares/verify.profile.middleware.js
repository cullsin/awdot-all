import { errorCodes } from '../../common/errors/errorCodes.js';
const { PROFILE, AUTH } = errorCodes;
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
                message: PROFILE[validation.errorCode],
                errors: errors.join(',') 
            });
        } else {
            return next();
        }
    } else {
        return res.status(200).send({
                success: false,
                code: 'PAY006', 
                message: AUTH[PAY006]
        });
    }
}

export function hasProfileValidInsertFields(req, res, next) {
    const validation = {
        fields : ['dateOfBirth','line1','line2','city','state',
        'country','postal_code', 'last_4', 'gov_id', 'gender', 'web3_wallet', 'wallet_key'],
        errorCode: 'PAY001'
    }
    return _validateFields(validation, req, res, next);
}

export function hasProfileValidUpdateFields(req, res, next) {
    const validation = {
        fields : ['profile_id'],
        errorCode: 'PAY002'
    }
    return _validateFields(validation, req, res, next);
} 
    
export function hasProfileValidUserFields(req, res, next) {
    const validation = {
        fields : ['user_id'],
        errorCode: 'PAY003'
    }
    return _validateFields(validation, req, res, next);
}


