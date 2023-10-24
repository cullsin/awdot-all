import https from '../../axios';
export const doInsertTransaction = async (params) => {
    const {
        number_of_shares, from_id, to_id, created_by, total_amount, 
        share_price, companies_id
    } = params;
    try {
        return await https.post('/transaction/insert', {
            number_of_shares, from_id, to_id, 
            created_by, total_amount, share_price, companies_id
        });
    } catch(error) {
        return error;
    }
}

export const doGetTransaction = async (params) => {
    const { transaction_id } = params;
    try {
        return await https.post('/transaction/get', { transaction_id});
    } catch(error) {
        return error;
    }
}

export const doUserTransaction = async (params) => {
    const { created_by } = params;
    try {
        return await https.post('/transaction/user', {created_by});
    } catch(error) {
        return error;
    }
}
