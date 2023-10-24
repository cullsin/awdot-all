import moment from 'moment';
import { v4 } from 'uuid';
import DotEnv from 'dotenv';
DotEnv.config();
import { createUser, list, activeUser, 
    updateUserPassword, findById, 
    updateUser, findByEmail} from '../models/user.model.js';
import {createOtp, getOtp} from '../models/userOtp.model.js';
import { randomBytes, createHmac } from 'crypto';
import { errorCodes } from '../../common/errors/errorCodes.js';
import sgMail from '@sendgrid/mail';
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const { USER } = errorCodes;
export async function insert(req, res, next) {
    let salt = randomBytes(16).toString('base64');
    let hash = createHmac('sha512', salt).update(req.body.password).digest("base64");
    req.body.password = salt + "$" + hash;
    try {
        const result = await createUser(req.body);
        if(result._id) {
            req.body.user_id = result._id;
            return next();
        } else {
            res.status(200).send({ error: JSON.stringify(result), code: 'PAY015', message: USER.PAY015, success: false });    
        }
    } catch(error) {
        res.status(200).send({error, code: 'PAY007', message: USER.PAY007, success: false });
    }        
}

export async function userlist(req, res) {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    try {
    const {users, total} = await list(limit, page);
    res.status(200).send({users, total, success:true});
    } catch (error) {
        res.status(200).send({error, code: 'PAY009', message:USER.PAY009, success: false });
    }
}

export async function generateOtp(req, res, next) {
    const body = {user_id : req.body.user_id};
    const result = await createOtp(body);
    if(result.otp) {
        req.body.otp = result.otp;
        return next();   
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: 'PAY016', message:USER.PAY016, success: false });           
    }
}

export async function getUser(req, res) {
    const { user_id, remote_user_id } = req.body;
    const current_user_id = remote_user_id || user_id;
    const result = await findById(current_user_id);
    if(result._id) {
        res.status(200).send({success : true, user: result });       
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: 'PAY024', message:USER.PAY024, success: false });           
    }
}

export async function getUserByEmail(req, res) {
    const { remote_email } = req.body;
    const users = await findByEmail(remote_email);
    if(users[0] && users[0]._id) {
        res.status(200).send({success : true, user : users[0] });       
    } else {
        res.status(200).send({ code: 'PAY064', message:USER.PAY064, success: false });           
    }
}

export async function getBuyer(req, res) {
    const { buyer_user_id } = req.body;
    const result = await findById(buyer_user_id);
    if(result._id) {
        res.status(200).send({success : true, user: result });       
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: 'PAY045', message:USER.PAY045, success: false });           
    }
}

export async function getSeller(req, res) {
    const { seller_user_id } = req.body;
    const result = await findById(seller_user_id);
    if(result._id) {
        res.status(200).send({success : true, user: result });       
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: 'PAY046', message:USER.PAY046, success: false });           
    }
}

export async function postUpdateUser(req, res) {
    const { user_id, firstName, lastName, phone, email } = req.body;
    let user = await findById(user_id);
    user.firstName = firstName;
    user.lastName = lastName;
    user.phone = phone;
    user.email = email;
    if(user._id) {
        const updatedUser = await updateUser(user);
        if(updatedUser._id) {
            res.status(200).send({ success:true, user: updatedUser});    
        }      
    } else {
        res.status(200).send({ error: JSON.stringify(user), code: 'PAY026', message:USER.PAY026, success: false });           
    }
}

export async function activateUser(req, res, next) {
    const otpData = await getOtp(req.body);
    if(otpData.otp === Number(req.body.otp)) {
        let result = await activeUser(req.body);
        if(result.is_active === true) {
            result = result.toJSON();
            result.dateOfBirth = moment(result.dateOfBirth).format('YYYY-MM-DD');
            res.status(200).send({ success:true, user: result });
        } else {
            res.status(200).send({ error: JSON.stringify(result), code: 'PAY018', message:USER.PAY018, success: false });
        }
    } else {
        res.status(200).send({ error: JSON.stringify(req.body.otp), code: 'PAY033', message:USER.PAY033, success: false });
    }
}

const _generateString = (length) => {
    let result='';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

export async function updatePassword(req, res) {
    let salt = randomBytes(16).toString('base64');
    let hash = createHmac('sha512', salt).update(req.body.password).digest("base64");
    const passwordString = req.body.password;
    req.body.password = salt + "$" + hash;
    try {
        const result = await updateUserPassword(req.body);
        if(result._id) {
            res.status(200).send({ success : true, passwordString, message:USER.PAY065});
        } else {
            res.status(200).send({ error: JSON.stringify(result), code: 'PAY021', message:USER.PAY021, success: false });    
        }
    } catch(error) {
        res.status(200).send({error, code: 'PAY021', message:USER.PAY021, success: false });
    }            
}

export async function generatePassword(req, res, next) {
    const passwordString = _generateString(5);
    req.body.password = passwordString;
    return next();

}

export async function sendOTPMail(req, res) {
    const { otp, user_id } = req.body;
    const user = await findById(user_id);
    if(otp) {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        const msg = {
          to: `${user.email}`,
          from: 'cullsin@gmail.com',
          subject: 'One Time Activation Password for Awdot',
          text: 'Below is the One time password Code. Please enter and activate your account',
          html: `<strong>${otp}</strong>`
        }
        const mailResponse = sgMail.send(msg);
        res.status(200).send({success : true, user_id, otp, code: 'PAY066', message:USER.PAY066, mail: mailResponse });       
    } else {
        res.status(200).send({ code: 'PAY016', message:USER.PAY016, success: false });           
    }
}

export async function getMessage(req, res) {
    const { message_user_id } = req.body;
    const result = await findById(message_user_id);
    if(result._id) {
        res.status(200).send({success : true, user: result });       
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: 'PAY080', message:USER.PAY080, success: false });           
    }
}
