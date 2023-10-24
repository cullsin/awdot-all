import moment from 'moment';
import mongoose  from '../../common/services/mongoose.service.js';
import { v4 } from 'uuid';
const Schema = mongoose.Schema;
const ProposalSchema = new Schema({
    _id: { type: String, default: v4 },
    created_by: {type: String, required : true },
    available_of_shares: {type: Number, 'required': true },
    selling_price: {type: Number, 'required': true },
    companies_id: {type: String, 'required': true },
    shares_id: {type: String, 'required': true },
    updated_date: {type: Date, default: Date.now},
    created_date: {type: Date, default: Date.now},
    is_deleted: {type: Boolean, default: false }
});

const Proposal = mongoose.model('proposal',ProposalSchema,'proposal');

export async function createProposal(data) {
    const proposal = new Proposal(data);
    const result = await proposal.save();
    return result;
}

export async function getProposalByCreated(created_by) {
    const result = await Proposal.find({created_by, is_deleted: false}).exec();
    return result;
}

export async function getProposals() {
    const result = await Proposal.find({is_deleted: false}).exec();
    return result;
}

export async function getProposalById(id) {
    return await Proposal.findById(id);
}

export async function updateProposal(data) {
    const updatedProposal = await Proposal.findById(data.proposal_id);
    if(data.available_of_shares === 0) {
        data.is_deleted = true;
    }
    await updatedProposal.updateOne({...data});
    return await Proposal.findById(data.proposal_id);
}

// Ensure virtual fields are serialised.
ProposalSchema.set('toJSON', {
    virtuals: true
});

ProposalSchema.options.toJSON.transform = function (doc, ret, options) {
    ret.proposal_id = ret._id;
    delete ret._id;
    delete ret.__v;
}