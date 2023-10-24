import { createHmac } from 'crypto';
import { userInfo } from 'os';
import { errorCodes } from '../../common/errors/errorCodes.js';
import { findByEmail } from '../../user/models/user.model.js';
const { AUTH } = errorCodes;
export function hasAuthValidFields(req, res, next) {
    let errors = [];
    const fields = ['email', 'password'];
    if (req.body) {
        fields.forEach((item) => {
            if(!req.body[item] || req.body[item].trim() === null || req.body[item].trim() === '') {
                    errors.push(item);
            }
        });
        if (errors.length > 0) {
            return res.status(200).send({
                success: false,
                code: 'PAY011', 
                message: PAY011,
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

export async function isPasswordAndUserMatch(req, res, next) {
    const users = await findByEmail(req.body.email)
    if (users.length === 0) {
        return res.status(200).send({
            success: false,
            code: 'PAY012', 
            message: AUTH.PAY012
        });
    } else {
        const user = users[0];
        let passwordFields = user.password.split('$');
        let salt = passwordFields[0];
        let hash = createHmac('sha512', salt).update(req.body.password).digest("base64");
        if (hash === passwordFields[1]) {
            req.body = {
                user_id: user.id,
                email: user.email,
                is_active: user.is_active,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                name: user.firstName + ' ' + user.lastName
            };
            if (user.is_active === false) {
                return res.status(200).send({
                    success: false,
                    code: 'PAY032', 
                    message: AUTH.PAY032,
                    user_id: user.id
                });
            } else {

                return next();
            }    
        } else {
            return res.status(200).send({
                success: false,
                code: 'PAY013', 
                message: AUTH.PAY013
            });    
        }    
    }        
}