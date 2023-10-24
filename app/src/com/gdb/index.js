import ghttps from '../../axios/gdb';

export const doMailGDBCompanies = async (params) => {
    try {
        return await ghttps.post('/gdb/mail', params);
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}

export const doSearchGDBCompanies = async (params) => {
    const {
        name
    } = params;
    try {
        return await ghttps.post('/gdb/search', {
            name
        });
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}

export const doListGDBCompanies = async (params) => {
    try {
        return await ghttps.post('/static/companies', {});
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}

export const doGetGDBCompanies = async (params) => {
    try {
        return await ghttps.get(`/companies/${params.id}`);
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}