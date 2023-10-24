import pkg from 'jsonwebtoken';
import DotEnv from 'dotenv';
DotEnv.config();
import { createHmac } from 'crypto';
import { errorCodes } from '../../common/errors/errorCodes.js';
const { PAY003, PAY004, PAY008, PAY029 } = errorCodes;
const { verify } = pkg;
const { jwt_secret } = process.env;
export function verifyRefreshBodyField(req, res, next) {
    if (req.body && req.body.refresh_token) {
        return next();
    } else {
        return res.status(400).send({error: 'need to pass refresh_token field'});
    }
}

export function validRefreshNeeded(req, res, next) {
    let b = Buffer.from(req.body.refresh_token, 'base64');
    let refresh_token = b.toString();
    let hash = createHmac('sha512', req.jwt.refreshKey).update(req.jwt.user_id + jwt_secret).digest("base64");
    if (hash === refresh_token) {
        req.body = req.jwt;
        return next();
    } else {
        return res.status(400).send({error: 'Invalid refresh token'});
    }
}


export function validJWTNeeded(req, res, next) {
    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] !== 'Bearer') {
                return res.status(200).send({success: false, code: 'PAY008', message: PAY008 }) 
            } else {
                const fields = verify(authorization[1], jwt_secret);
                if(fields.user_id && req.body.user_id) {
                    return res.status(200).send({ 
                        success: false, 
                        code: 'PAY029', message: PAY029});        
                }
                req['user'] = fields;
                req.body.user_id = fields.user_id ? fields.user_id : req.body.user_id; 
                return next();
            }
        } catch (error) {
            return res.status(200).send({ error, success: false, code: 'PAY004', message: PAY004, accessToken: authorization[1]});
        }
    } else {
        return res.status(200).send({ success: false, code: 'PAY003', message: PAY003 });
    }
}
