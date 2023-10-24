import { errorCodes } from '../../common/errors/errorCodes.js';
const { COMMON, SHARES } = errorCodes;
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
                message: SHARES[validation.errorCode],
                errors: errors.join(',') 
            });
        } else {
            return next();
        }
    } else {
        return res.status(200).send({
                success: false,
                code: 'AUTH001', 
                message: COMMON.AUTH001
        });
    }
}

export function hasValidInsertFields(req, res, next) {
    const validation = {
        fields : ['user_id', 'number_of_shares', 'base_price', 'created_by'],
        errorCode: '001'
    }
    return _validateFields(validation, req, res, next); 
}

export function hasValidCompaniesFields(req, res, next) {
    const validation = {
        fields : ['user_id','companies_id'],
        errorCode: '019'
    }
    return _validateFields(validation, req, res, next); 
}

export function hasValidGetFields(req, res, next) {
    const validation = {
        fields : ['user_id','shares_id'],
        errorCode: '002'
    }
    return _validateFields(validation, req, res, next); 
}

export function hasValidUserFields(req, res, next) {
    const validation = {
        fields : ['user_id', 'created_by'],
        errorCode: '004'
    }
    return _validateFields(validation, req, res, next); 
}

export function hasValidUpdateFields(req, res, next) {
    const validation = {
        fields : ['user_id', 'shares_id'],
        errorCode: '005'
    }
    return _validateFields(validation, req, res, next); 
}

export function hasValidBoughtFields(req, res, next) {
    const validation = {
        fields : ['user_id', 'from_shares_id', 'investment_id', 'created_by', 'to_shares_id'],
        errorCode: '015'
    }
    return _validateFields(validation, req, res, next); 
}

export function hasValidInvestmentFields(req, res, next) {
    const validation = {
        fields : ['user_id','investment_id'],
        errorCode: '007'
    }
    return _validateFields(validation, req, res, next); 
}

export function hasValidUpdateCountFields(req, res, next) {
    const validation = {
        fields : ['user_id', 'from_shares_id', 'to_available_of_shares'],
        errorCode: '006'
    }
    return _validateFields(validation, req, res, next); 
}