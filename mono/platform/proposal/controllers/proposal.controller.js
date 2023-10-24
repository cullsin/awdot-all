import { createProposal, 
    getProposalById,
    getProposalByCreated,
    getProposals,
    updateProposal
} from '../models/proposal.model.js';
import { errorCodes } from '../../common/errors/errorCodes.js';
const { PROPOSAL } = errorCodes;
export async function doInsert(req, res) {
    const result = await createProposal(req.body);
    if(result._id) {
        res.status(200).send({ code: '007', message: PROPOSAL['007'], success: true, proposal:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '008', message: PROPOSAL['008'], success: false });    
    }        
}

export async function doGet(req, res) {
    const { proposal_id } = req.body;
    const result = await getProposalById(proposal_id);
    if(result._id) {
        res.status(200).send({ code: '009', message: PROPOSAL['009'], success: true, proposal:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '010', message: PROPOSAL['010'], success: false });           
    }
}

export async function doUser(req, res) {
    const { created_by } = req.body;
    const result = await getProposalByCreated(created_by);
    if(result && result.length >= 0 ) {
        res.status(200).send({ code: '011', message: PROPOSAL['011'], success: true, proposals:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '012', message: PROPOSAL['012'], success: false });           
    }
}

export async function doRemove(req, res) {
    const result = await updateProposal(req.body);
    if(result._id) {
        res.status(200).send({ code: '013', message: PROPOSAL['013'], success: true, proposal:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '014', message: PROPOSAL['014'], success: false });    
    }        
}

export async function doList(req, res) {
    const result = await getProposals();
    if(result && result.length >= 0) {
        res.status(200).send({ code: '015', message: PROPOSAL['015'], success: true, proposals:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '016', message: PROPOSAL['016'], success: false });           
    }
}

export async function doUpdate(req, res) {
    const result = await updateProposal(req.body);
    if(result._id) {
        res.status(200).send({ code: '018', message: PROPOSAL['018'], success: true, proposal:result });
    } else {
        res.status(200).send({ error: JSON.stringify(result), code: '019', message: PROPOSAL['019'], success: false });    
    }        
}
