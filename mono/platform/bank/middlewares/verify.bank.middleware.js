import { errorCodes } from '../../common/errors/errorCodes.js';
const { BANK, AUTH } = errorCodes;
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
                message: BANK[validation.errorCode],
                errors: errors.join(',') 
            });
        } else {
            return next();
        }
    } else {
        return res.status(200).send({
                success: false,
                code: 'PAY006', 
                message: AUTH.PAY006
        });
    }
}

export function hasBankUserFields(req, res, next) {
    const validation = {
        fields : ['user_id'],
        errorCode: 'PAY084'
    }
    return _validateFields(validation, req, res, next);
}

export function hasBankRemoveFields(req, res, next) {
    const validation = {
        fields : ['bank_id'],
        errorCode: 'PAY086'
    }
    return _validateFields(validation, req, res, next);
}

export function hasBankInsertFields(req, res, next) {
    const validation = {
        fields : [ 'bank_name',
            'branch_id', 'bank_account_no','bank_account_name', 'bank_currency', 'bank_country'],
        errorCode: 'PAY085'
    }
    return _validateFields(validation, req, res, next);
}
