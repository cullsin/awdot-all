import https from '../../axios';

export const doInsertPartners = async (params) => {
    const {
        name, short_name, about, domain, url, phone, phoneCode, email, country, created_by, video_url,
        stage, revenue_amount, target_amount, achieved_amount
    } = params;
    try {
        return await https.post('/partners/insert', {
            name, short_name, about, domain, url, phone, phoneCode, email, country, created_by, video_url,
            stage, revenue_amount, target_amount, achieved_amount
        });
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}

export const doUpdatePartners = async (params) => {
    const {
        partners_id, name, short_name, about, domain, url, phone, phoneCode, email, country, created_by, video_url,
        stage, revenue_amount, target_amount, achieved_amount
    } = params;
    try {
        return await https.post('/partners/update', {
            partners_id,name, short_name, about, domain, 
            url, phone, phoneCode, email, country, created_by, video_url,
            stage, revenue_amount, target_amount, achieved_amount
        });
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}

export const doGetPartners = async (params) => {
    const { partners_id } = params;
    try {
        return await https.post('/partners/get', { partners_id});
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}

export const doListPartners = async (params) => {
    try {
        return await https.post('/partners/list', {});
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}

export const doUserPartners = async (params) => {
    const { created_by } = params;
    try {
        return await https.post('/partners/user', {created_by});
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}

export const doRemovePartners = async (params) => {
    const { partners_id } = params;
    try {
        return await https.post('/partners/remove', { partners_id });
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}


export const doInterestedPartners = async (params) => {
    const {is_interest} = params;
    try {
        return await https.post('/partners/interested', {is_interest});
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}
