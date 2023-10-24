import { errorCodes } from '../../common/errors/errorCodes.js';
const { AUTH } = errorCodes;
export function hasGenericAuthValidFields(req, res, next) {
    if (req.body) {
        if (!req.body.client_ip) {
            return res.status(200).send({ code: 'PAY001', message: AUTH.PAY001, success: false });
        } else {
            return next();
        }
    } else {
        return res.status(200).send({ code: 'PAY001', message: AUTH.PAY001, success: false });
    }
}
