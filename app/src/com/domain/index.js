import https from '../../axios';

export const doInsertDomain = async (params) => {
    const {
        name, type, type_id, created_by
    } = params;
    try {
        return await https.post('/domain/insert', {
            name, type, type_id, created_by
        });
    } catch(error) {
        return error;
    }
}

export const doUpdateDomain = async (params) => {
    const {
        name, type, type_id, created_by,domain_id
    } = params;
    try {
        return await https.post('/domain/update', {
            name, type, type_id, created_by, domain_id
        });
    } catch(error) {
        return error;
    }
}

export const doGetDomain = async (params) => {
    const { domain_id } = params;
    try {
        return await https.post('/domain/get', { domain_id});
    } catch(error) {
        return error;
    }
}

export const doListDomain = async (params) => {
    const {} = params;
    try {
        return await https.post('/domain/list', {});
    } catch(error) {
        return error;
    }
}

export const doUserDomain = async (params) => {
    const { created_by } = params;
    try {
        return await https.post('/domain/user', {created_by});
    } catch(error) {
        return error;
    }
}

export const doRemoveDomain = async (params) => {
    const { domain_id } = params;
    try {
        return await https.post('/domain/remove', { domain_id });
    } catch(error) {
        return error;
    }
}

export const doTypeDomain = async (params) => {
    const {type_id} = params;
    try {
        return await https.post('/domain/type', {type_id});
    } catch(error) {
        return error;
    }
}