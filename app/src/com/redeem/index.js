import https from '../../axios';
export const doInsertRedeem = async (params) => {
    const {
        number_of_dots, total_amount, transaction_amount, actual_amount, currency, created_by
    } = params;
    try {
        return await https.post('/redeem/insert', {
            number_of_dots, total_amount, transaction_amount, actual_amount, currency, created_by
        });
    } catch(error) {
        return error;
    }
}

export const doGetRedeem = async (params) => {
    const { redeem_id } = params;
    try {
        return await https.post('/redeem/get', { redeem_id});
    } catch(error) {
        return error;
    }
}

export const doUserRedeem = async (params) => {
    const { created_by } = params;
    try {
        return await https.post('/redeem/user', {created_by});
    } catch(error) {
        return error;
    }
}

export const doFeeRedeem = async (params) => {
    try {
        return await https.post('/redeem/fee');
    } catch(error) {
        return error;
    }
}

export const doUpdateRedeem = async (params) => {
    const {
        redeem_id, is_active
    } = params;
    try {
        return await https.post('/redeem/update', {
            redeem_id, is_active
        });
    } catch(error) {
        return error;
    }
}

