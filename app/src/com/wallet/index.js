import https from '../../axios';
export const doInsertWallet = async (params) => {
    const {
        balance, created_by
    } = params;
    try {
        return await https.post('/wallet/insert', {
            balance, created_by
        });
    } catch(error) {
        return error;
    }
}

export const doGetWallet = async (params) => {
    const { wallet_id } = params;
    try {
        return await https.post('/wallet/get', { wallet_id});
    } catch(error) {
        return error;
    }
}

export const doUserWallet = async (params) => {
    const { created_by } = params;
    try {
        return await https.post('/wallet/user', {created_by});
    } catch(error) {
        return error;
    }
}

export const doUpdateWallet = async (params) => {
    const { balance, created_by } = params;
    try {
        return await https.post('/wallet/update', {balance, created_by});
    } catch(error) {
        return error;
    }
}

export const doUserWalletHistory = async (params) => {
    const { created_by } = params;
    try {
        return await https.post('/wallet/history/user', {created_by});
    } catch(error) {
        return error;
    }
}

export const doInsertWalletHistory = async (params) => {
    const {
        balance, created_by
    } = params;
    try {
        return await https.post('/wallet/history/insert', {
            balance, created_by
        });
    } catch(error) {
        return error;
    }
}