import https from '../../axios';

export const doInsertCompanies = async (params) => {
    const {
        name, short_name, about, domain, url, phone, phoneCode, email, country, created_by, video_url,
        stage, revenue_amount, target_amount, achieved_amount, cin
    } = params;
    try {
        return await https.post('/companies/insert', {
            name, short_name, about, domain, url, phone, phoneCode, email, country, created_by, video_url,
            stage, revenue_amount, target_amount, achieved_amount, cin
        });
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}

export const doUpdateCompanies = async (params) => {
    const {
        companies_id, name, short_name, about, domain, url, phone, phoneCode, email, country, created_by, video_url,
        stage, revenue_amount, target_amount, achieved_amount, cin
    } = params;
    try {
        return await https.post('/companies/update', {
            companies_id,name, short_name, about, domain, 
            url, phone, phoneCode, email, country, created_by, video_url,
            stage, revenue_amount, target_amount, achieved_amount, cin
        });
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}

export const doGetCompanies = async (params) => {
    const { companies_id } = params;
    try {
        return await https.post('/companies/get', { companies_id});
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}

export const doListCompanies = async (params) => {
    try {
        return await https.post('/companies/list', {});
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}

export const doUserCompanies = async (params) => {
    const { created_by } = params;
    try {
        return await https.post('/companies/user', {created_by});
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}

export const doRemoveCompanies = async (params) => {
    const { companies_id } = params;
    try {
        return await https.post('/companies/remove', { companies_id });
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}


export const doInterestedCompanies = async (params) => {
    const {is_interest} = params;
    try {
        return await https.post('/companies/interested', {is_interest});
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}
