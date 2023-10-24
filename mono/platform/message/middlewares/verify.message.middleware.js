import { errorCodes } from '../../common/errors/errorCodes.js';
const { MESSAGE } = errorCodes;
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
                message: MESSAGE[validation.errorCode],
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

export function hasInsertValidFields(req, res, next) {
    const validation = {
        fields : ['product_id', 'user_id', 'content'],
        errorCode: 'PAY074'
    }
    return _validateFields(validation, req, res, next); 
}

export function hasByEscrowValidFields(req, res, next) {
    const validation = {
        fields : ['escrow_id', 'user_id'],
        errorCode: 'PAY075'
    }
    return _validateFields(validation, req, res, next);
}

export function hasDeleteValidFields(req, res, next) {
    const validation = {
        fields : ['message_id', 'user_id'],
        errorCode: 'PAY076'
    }
    return _validateFields(validation, req, res, next);
}
