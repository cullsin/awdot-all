import https from '../../axios';

export const doInsertInvestment = async (params) => {
    const {
        name, type, about, url, phone,phoneCode, email, country, created_by
    } = params;
    try {
        return await https.post('/investment/insert', {
            name, type, about, url, phone, phoneCode, email, country, created_by
        });
    } catch(error) {
        return error;
    }
}

export const doUpdateInvestment = async (params) => {
    const {
        name, type, about, url, phone, email,phoneCode, investment_id, country, created_by
    } = params;
    try {
        return await https.post('/investment/update', {
            name, type, about, url, phone, email, country, created_by,phoneCode, investment_id
        });
    } catch(error) {
        return error;
    }
}

export const doGetInvestment = async (params) => {
    const { investment_id } = params;
    try {
        return await https.post('/investment/get', { investment_id});
    } catch(error) {
        return error;
    }
}

export const doListInvestment = async (params) => {
    const {} = params;
    try {
        return await https.post('/investment/list', {});
    } catch(error) {
        return error;
    }
}

export const doUserInvestment = async (params) => {
    const { created_by } = params;
    try {
        return await https.post('/investment/user', {created_by});
    } catch(error) {
        return error;
    }
}

export const doRemoveInvestment = async (params) => {
    const { investment_id } = params;
    try {
        return await https.post('/investment/remove', { investment_id });
    } catch(error) {
        return error;
    }
}

export const doInterestedInvestment = async (params) => {
    const {is_interest} = params;
    try {
        return await https.post('/investment/interested', {is_interest});
    } catch(error) {
        return error;
    }
}