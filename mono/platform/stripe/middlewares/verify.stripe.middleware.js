import { errorCodes } from '../../common/errors/errorCodes.js';
const { STRIPE } = errorCodes;
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
                message: STRIPE[validation.errorCode],
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

export function hasStripeGenerateClientKeyFields(req, res, next) {
    const validation = {
        fields : ['user_id', 'purchase_id', 'amount', 'currency'],
        errorCode: 'PAY081'
    }
    return _validateFields(validation, req, res, next);
}