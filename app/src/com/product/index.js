import https from '../../axios';

export const doInsertProduct = async (params) => {
    const {
        name, companies_id, summary
    } = params;
    try {
        return await https.post('/product/insert', {
            name, companies_id, summary
        });
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}

export const doGetProduct = async (params) => {
    const { product_id } = params;
    try {
        return await https.post('/product/get', { product_id});
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}

export const doListProduct = async (params) => {
    try {
        return await https.post('/product/list', {});
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}

export const doCompaniesProduct = async (params) => {
    const { companies_id } = params;
    try {
        return await https.post('/product/companies', {companies_id});
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}

export const doRemoveProduct = async (params) => {
    const { prodcompanies_id, is_deleted } = params;
    try {
        return await https.post('/product/remove', { prodcompanies_id, is_deleted: true });
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}