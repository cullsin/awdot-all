import { 
    getFileById 
} from '../../file/models/file.model.js';
import { createFileConnect,
    getFileByConnect,
    getFileConnectById,
    removeFileConnect 
} from '../models/fileConnect.model.js';
import { errorCodes } from '../../common/errors/errorCodes.js';
const { FILECONNECT } = errorCodes;
export async function doInsert(req, res) {
    const result = await createFileConnect(req.body);
    if(result._id) {
        res.status(200).send({ code: '007', message: FILECONNECT['007'], success: true, file:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '008', message: FILECONNECT['008'], success: false });    
    }        
}

export async function doGet(req, res) {
    const { file_id } = req.body;
    const result = await getFileConnectById(file_id);
    if(result._id) {
        res.status(200).send({ code: '009', message: FILECONNECT['009'], success: true, file:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '010', message: FILECONNECT['010'], success: false });           
    }
}

export async function doConnect(req, res) {
    let result = await getFileByConnect(req.body);
    if(result.length > 0) {
        for(let index = 0; index < result.length; index++) {
            result[index].file = await getFileById(result[index].file_id);
        }
        res.status(200).send({ code: '015', message: FILECONNECT['015'], success: true, files:result });
    } else {
        res.status(200).send({ code: '015', message: FILECONNECT['015'], success: true, files:result });           
    }
}

export async function doRemove(req, res) {
    const result = await removeFileConnect(req.body);
    if(result._id) {
        res.status(200).send({ code: '013', message: FILECONNECT['013'], success: true, file:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '014', message: FILECONNECT['014'], success: false });    
    }        
}
