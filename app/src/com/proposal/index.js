import https from '../../axios';

export const doInsertProposal = async (params) => {
    const {
        available_of_shares, selling_price, shares_id, created_by, companies_id
    } = params;
    try {
        return await https.post('/proposal/insert', {
            available_of_shares, selling_price, shares_id, created_by, companies_id
        });
    } catch(error) {
        return error;
    }
}

export const doUpdateProposal = async (params) => {
    const {
        available_of_shares, selling_price, shares_id, created_by, companies_id, proposal_id
    } = params;
    try {
        return await https.post('/proposal/update', {
            available_of_shares, selling_price, shares_id, created_by, companies_id, proposal_id
        });
    } catch(error) {
        return error;
    }
}

export const doGetProposal = async (params) => {
    const { proposal_id } = params;
    try {
        return await https.post('/proposal/get', { proposal_id});
    } catch(error) {
        return error;
    }
}

export const doListProposal = async (params) => {
    const {} = params;
    try {
        return await https.post('/proposal/list', {});
    } catch(error) {
        return error;
    }
}

export const doUserProposal = async (params) => {
    const { created_by } = params;
    try {
        return await https.post('/proposal/user', {created_by});
    } catch(error) {
        return error;
    }
}

export const doRemoveProposal = async (params) => {
    const { proposal_id } = params;
    try {
        return await https.post('/proposal/remove', { proposal_id });
    } catch(error) {
        return error;
    }
}