import https from '../../axios';

export const doInsertClients = async (params) => {
    const {
        clients_id, partners_id
    } = params;
    try {
        return await https.post('/clients/insert', {
            clients_id, partners_id
        });
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}

export const doGetClients = async (params) => {
    const { clients_id } = params;
    try {
        return await https.post('/clients/get', { clients_id});
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}

export const doListClients = async (params) => {
    try {
        return await https.post('/clients/list', {});
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}

export const doPartnersClients = async (params) => {
    const { partners_id } = params;
    try {
        return await https.post('/clients/partners', {partners_id});
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}

export const doRemoveClients = async (params) => {
    const { prodpartners_id, is_deleted } = params;
    try {
        return await https.post('/clients/remove', { prodpartners_id, is_deleted: true });
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}