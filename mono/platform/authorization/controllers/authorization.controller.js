import DotEnv from 'dotenv';
DotEnv.config();
import { randomBytes, createHmac } from 'crypto';
import pkg from 'jsonwebtoken';
import { errorCodes } from '../../common/errors/errorCodes.js';

const { sign } = pkg;
const { PAY002, PAY014 } = errorCodes;
const { jwt_secret } = process.env;

export function generic(req, res) {
    try {
        let refreshId = req.body.client_ip + jwt_secret;
        let salt = randomBytes(16).toString('base64');
        let hash = createHmac('sha512', salt).update(refreshId).digest("base64");
        req.body.refreshKey = salt;
        let token = sign(req.body, jwt_secret);
        let b = Buffer.from(hash);
        let refresh_token = b.toString('base64');
        res.status(200).send({accessToken: token, refreshToken: refresh_token, success: true });
    } catch (error) {
        res.status(200).send({error, code: 'PAY002', message: PAY002, success: false });
    }
}

export function login(req, res) {
    try {
        let refreshId = req.body.user_id + jwt_secret;
        let salt = randomBytes(16).toString('base64');
        let hash = createHmac('sha512', salt).update(refreshId).digest("base64");
        req.body.refreshKey = salt;
        let token = sign(req.body, jwt_secret);
        let b = Buffer.from(hash);
        let refresh_token = b.toString('base64');
        res.status(200).send({accessToken: token, refreshToken: refresh_token, success: true, 
            user_id: req.body.user_id, 
            email:req.body.email, 
            is_active: req.body.is_active,
            name: req.body.name,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone
        });
    } catch (error) {
        res.status(200).send({error, code: 'PAY014', message: PAY014, success: false });
    }
}

export function refresh_token(req, res) {
    try {
        req.body = req.jwt;
        let token = sign(req.body, jwt_secret);
        res.status(201).send({id: token});
    } catch (err) {
        res.status(500).send({errors: err});
    }
}

