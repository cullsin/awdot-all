import https from '../../axios';
export const insertBank = async (params) => {
    const {
        bank_name, bank_account_name,
        branch_id, bank_account_no, bank_currency, bank_country } = params;
    try {
        return await https.post('/bank/insert', {
            bank_name,
        branch_id, bank_account_no,bank_account_name, bank_currency, bank_country
        });
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}

export const getBanks = async () => {
    try {
        return await https.post('/bank/getByUser');
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}

export const removeBank = async (params) => {
    const {bank_id } = params;
    try {
        return await https.post('/bank/remove', {bank_id});
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}
