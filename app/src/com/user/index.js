import https from '../../axios';
export const makeActive = async (params) => {
    const {user_id, otp} = params;
    try {
        return await https.post('/user/active', {
            user_id, otp
        });
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}

export const forgetPassword = async (params) => {
    const {email} = params;
    try {
        return await https.post('/user/forget', {
            email
        });
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}

export const generateOtp = async (params) => {
    const {user_id} = params;
    try {
        return await https.post('/user/generateOtp', {
            user_id
        });
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}

export const getByEmail = async (params) => {
    const {remote_email} = params;
    try {
        return await https.post('/user/getByEmail', {
            remote_email
        });
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}

export const getUserBySeller = async (params) => {
    const {seller_user_id} = params;
    try {
        return await https.post('/user/seller', {
            seller_user_id
        });
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}

export const getUserByBuyer = async (params) => {
    const {buyer_user_id} = params;
    try {
        return await https.post('/user/buyer', {
            buyer_user_id
        });
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}

export const getUserByMessage = async (params) => {
    const {message_user_id} = params;
    try {
        return await https.post('/user/message', {
            message_user_id
        });
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}