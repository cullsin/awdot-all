import https from '../../axios';
export const createProfile = async (params) => {
    const { line1, line2, city, state, country, postal_code, 
        dateOfBirth, gov_id, last_4, gender, web3_wallet, wallet_key } = params;
    try {
        return await https.post('/profile/insert', {
            line1, line2, city, state, country, postal_code, 
            dateOfBirth, gov_id, last_4, gender, web3_wallet, wallet_key
        });
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}

export const updateProfile = async (params) => {
    const { profile_id, line1, line2, city, state, country, 
        postal_code, dateOfBirth, gov_id, last_4, gender, web3_wallet, wallet_key } = params;
    try {
        return await https.post('/profile/update', {
            line1, line2, city, state, country, postal_code, dateOfBirth, 
            profile_id, gov_id, last_4, gender, web3_wallet, wallet_key
        });
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}

export const getProfileByUser = async (params) => {
    try {
        return await https.post('/profile/user');
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}