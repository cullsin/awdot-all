import https from '../../axios';
export const doInsertShares = async (params) => {
    const {
        number_of_shares, base_price, created_by, companies_id, investment_id
    } = params;
    try {
        return await https.post('/shares/insert', {
            number_of_shares, base_price, created_by, companies_id, investment_id
        });
    } catch(error) {
        return error;
    }
}

export const doCompaniesShares = async (params) => {
    const { companies_id } = params;
    try {
        return await https.post('/shares/company', { companies_id});
    } catch(error) {
        return error;
    }
}

export const doInvestmentShares = async (params) => {
    const { investment_id } = params;
    try {
        return await https.post('/shares/investment', { investment_id});
    } catch(error) {
        return error;
    }
}

export const doGetShares = async (params) => {
    const { shares_id } = params;
    try {
        return await https.post('/shares/get', { shares_id});
    } catch(error) {
        return error;
    }
}

export const doUserShares = async (params) => {
    const { created_by } = params;
    try {
        return await https.post('/shares/user', {created_by});
    } catch(error) {
        return error;
    }
}

export const doUpdateShares = async (params) => {
    const { shares_id, number_of_shares, companies_id, created_by, investment_id } = params;
    try {
        return await https.post('/shares/update', {created_by, shares_id, number_of_shares, companies_id, investment_id });
    } catch(error) {
        return error;
    }
}

export const doBoughtShares = async (params) => {
    const { shares_id, investment_id, from_shares_id, to_available_of_shares } = params;
    try {
        return await https.post('/shares/bought', { shares_id, investment_id, from_shares_id, to_available_of_shares });
    } catch(error) {
        return error;
    }
}