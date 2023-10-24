import https from '../../axios';

export const doInsertInterest = async (params) => {
    const {
        name, partners_id
    } = params;
    try {
        return await https.post('/interest/insert', {
            name, partners_id
        });
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}

export const doGetInterest = async (params) => {
    const { interest_id } = params;
    try {
        return await https.post('/interest/get', { interest_id});
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}

export const doListInterest = async (params) => {
    try {
        return await https.post('/interest/list', {});
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}

export const doPartnersInterest = async (params) => {
    const { partners_id } = params;
    try {
        return await https.post('/interest/partners', {partners_id});
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}

export const doRemoveInterest = async (params) => {
    const { catpartners_id } = params;
    try {
        return await https.post('/interest/remove', { catpartners_id, is_deleted: true });
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}