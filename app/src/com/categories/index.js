import https from '../../axios';

export const doInsertCategories = async (params) => {
    const {
        name, companies_id
    } = params;
    try {
        return await https.post('/categories/insert', {
            name, companies_id
        });
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}

export const doGetCategories = async (params) => {
    const { categories_id } = params;
    try {
        return await https.post('/categories/get', { categories_id});
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}

export const doListCategories = async (params) => {
    try {
        return await https.post('/categories/list', {});
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}

export const doCompaniesCategories = async (params) => {
    const { companies_id } = params;
    try {
        return await https.post('/categories/companies', {companies_id});
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}

export const doRemoveCategories = async (params) => {
    const { catcompanies_id } = params;
    try {
        return await https.post('/categories/remove', { catcompanies_id, is_deleted: true });
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}