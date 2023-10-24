import https from '../../axios';
export const doInsertPurchase = async (params) => {
    const {
        number_of_dots, total_amount, transaction_amount, actual_amount, currency, created_by
    } = params;
    try {
        return await https.post('/purchase/insert', {
            number_of_dots, total_amount, transaction_amount, actual_amount, currency, created_by
        });
    } catch(error) {
        return error;
    }
}

export const doGetPurchase = async (params) => {
    const { purchase_id } = params;
    try {
        return await https.post('/purchase/get', { purchase_id});
    } catch(error) {
        return error;
    }
}

export const doUserPurchase = async (params) => {
    const { created_by } = params;
    try {
        return await https.post('/purchase/user', {created_by});
    } catch(error) {
        return error;
    }
}

export const doFeePurchase = async (params) => {
    try {
        return await https.post('/purchase/fee');
    } catch(error) {
        return error;
    }
}

export const doUpdatePurchase = async (params) => {
    const {
        purchase_id, is_active
    } = params;
    try {
        return await https.post('/purchase/update', {
            purchase_id, is_active
        });
    } catch(error) {
        return error;
    }
}
