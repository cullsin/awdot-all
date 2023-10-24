import https from '../../axios';
export const insertMessage = async (params) => {
    const {message_user_id, escrow_id, content} = params;
    try {
        return await https.post('/message/insert', {
            message_user_id, escrow_id, content
        });
    } catch(e) {
        return { data: `error ${e}`}
    }
}

export const userMessages = async (params) => {
    const {escrow_id} = params;
    try {
        return await https.post('/message/getByEscrow', {escrow_id});
    } catch(e) {
        return { data: `error ${e}`}
    }
}

export const removeMessage = async (params) => {
    const {message_id } = params;
    try {
        return await https.post('/message/delete', {message_id});
    } catch(e) {
        return { data: `error ${e}`}
    }
}
