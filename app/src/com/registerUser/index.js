import https from '../../axios';
export const createUserRegister = async (params) => {
    const {firstName, lastName, email, phone, password } = params;
    try {
        return await https.post('/user/insert', {
            firstName, lastName, email, phone, password
        });
    } catch(exception) {
        const error = exception.toJSON();
        return { data: {'success' : false, 'code': error.code, 'message': error.message } };
    }
}