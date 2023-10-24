import { insert, userlist, generateOtp, activateUser, updatePassword,
    generatePassword, getUser, postUpdateUser, 
    getSeller, getBuyer, getUserByEmail, getMessage, sendOTPMail } from './controllers/user.controller.js';
import { validJWTNeeded } from '../common/middlewares/auth.validation.middleware.js';
import { hasUserValidFields, isEmailExists, isDuplicateEmail,
    isEmailAvailable, hasUserValidOtpFields, hasUserValidForgetFields,
    hasUserValidUserFields, hasUserValidUpdateFields, 
    hasUserValidChangePasswordFields, hasUserValidGenerateOtpFields,
    hasUserValidBuyerFields,hasUserValidSellerFields, 
    hasUserValidEmailFields, hasUserValidMessageFields } from './middlewares/verify.user.middleware.js';

export default function userRoutesConfig (app) {
    app.post('/user/insert', [
        validJWTNeeded, 
        hasUserValidFields,
        isEmailExists,
     	insert,
        generateOtp,
        sendOTPMail
    ]);
    
    app.post('/user/generateOtp', [
        validJWTNeeded, 
        hasUserValidGenerateOtpFields,
        generateOtp
    ]);
    app.post('/user/update', [
        validJWTNeeded, 
        hasUserValidUpdateFields,
        isDuplicateEmail,
        postUpdateUser
    ]);
    app.post('/user/updatePassword', [
        validJWTNeeded, 
        hasUserValidChangePasswordFields,
        updatePassword
    ]);
    app.post('/user/active', [
        validJWTNeeded, 
        hasUserValidOtpFields,
        activateUser 
    ]);
    app.post('/user/forget', [
        validJWTNeeded, 
        hasUserValidForgetFields,
        isEmailAvailable,
        generatePassword,
        updatePassword
    ]);
    app.get('/users', [
        validJWTNeeded,
        userlist
    ]);
    app.post('/user/get', [
        validJWTNeeded,
        hasUserValidUserFields,
        getUser
    ]);

    app.post('/user/buyer', [
        validJWTNeeded,
        hasUserValidBuyerFields,
        getBuyer
    ]);

    app.post('/user/seller', [
        validJWTNeeded,
        hasUserValidSellerFields,
        getSeller
    ]);

    app.post('/user/message', [
        validJWTNeeded,
        hasUserValidMessageFields,
        getMessage
    ]);

    app.post('/user/getByEmail', [
        validJWTNeeded,
        hasUserValidEmailFields,
        getUserByEmail
    ]);

}