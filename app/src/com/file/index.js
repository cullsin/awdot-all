import https from '../../axios';
export const removeFile = async (params) => {
    const { file_id } = params;
    try {
        return await https.post('/file/remove', {
            file_id 
        });
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}

export const getFile = async (params) => {
    const { file_id } = params;
    try {
        return await https.post('/file/get', {
            file_id 
        });
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}

export const uploadFile = async (params) => {
    const { genericFile, title, category, created_by } = params;
    const data = new FormData();
    data.append('genericFile', genericFile);
    data.append('title', title);
    data.append('category', category);
    data.append('created_by', created_by);
    try {
        return await https.post('/file/insert', data, {
            headers: {
                "Content-Type": "multipart/form-data"
              }
        });
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}

export const insertFileConnect = async (params) => {
    const { file_id, connect_id, created_by, connect_type } = params;
    try {
        return await https.post('/file/connect/insert', {
            file_id, connect_id, created_by, connect_type
        });
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}

export const getFileConnectById = async (params) => {
    const { file_connect_id } = params;
    try {
        return await https.post('/file/connect/get', {
            file_connect_id 
        });
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}

export const userFileConnect = async (params) => {
    const { connect_id, connect_type } = params;
    try {
        return await https.post('/file/connect', {
            connect_id, connect_type 
        });
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}

export const removeFileConnect = async (params) => {
    const { file_id } = params;
    try {
        return await https.post('/file/connect/remove', {
            file_id 
        });
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}
