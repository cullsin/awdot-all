import { errorCodes } from '../../common/errors/errorCodes.js';
const { COMMON, INVESTMENT } = errorCodes;
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
                message: INVESTMENT[validation.errorCode],
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
        fields : ['user_id', 'name', 'type', 'type_id'],
        errorCode: '001'
    }
    return _validateFields(validation, req, res, next); 
}

export function hasValidGetFields(req, res, next) {
    const validation = {
        fields : ['user_id','domain_id'],
        errorCode: '002'
    }
    return _validateFields(validation, req, res, next); 
}

export function hasValidListFields(req, res, next) {
    const validation = {
        fields : ['user_id'],
        errorCode: '003'
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

export function hasValidRemoveFields(req, res, next) {
    const validation = {
        fields : ['user_id', 'domain_id'],
        errorCode: '005'
    }
    return _validateFields(validation, req, res, next); 
}

export function hasValidTypeFields(req, res, next) {
    const validation = {
        fields : ['user_id', 'type_id'],
        errorCode: '006'
    }
    return _validateFields(validation, req, res, next); 
}

export function hasValidUpdateFields(req, res, next) {
    const validation = {
        fields : ['user_id', 'name', 'type', 'type_id'],
        errorCode: '007'
    }
    return _validateFields(validation, req, res, next); 
}
