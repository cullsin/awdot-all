import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {Col, Row, InputGroup, Form, Button, Card, Table, Image} from 'react-bootstrap';
import { useNavigate} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {isUndefined } from 'lodash';
import {FiEdit, FiTrash} from 'react-icons/fi';
import Confirmation from '../../Confirmation';
import { userProposalRequest } from '../../../db/action/proposal';
import PageHeader from '../../PageHeader';
import Error from '../../Error';
const LProposal = (props) => {
    const {ProposalList, setIndex, setProposalId, login} = props;
    const navigate = useNavigate();
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState({
        content: '',
        variant: ''
    });
    useEffect(() => {
        setLoading(true);
        props.userProposalRequest({
            created_by: login.user_id
        });
    }, []);

    useEffect(() => {
        const {success, code, message} = ProposalList;
        if(isUndefined(success)) {
            return false;
        }
        if(success === true) { 
            setInfo({
                ...info,
                    content: `${code} - ${message}`,
                    variant: 'success'
            });
            setShowError(true);
            setLoading(false);
        } else {
            setInfo({
                ...info,
                    content: `${code} - ${message}`,
                    variant: 'warning'
            });
            setShowError(true);
            setLoading(false);
        } 
    }, [ProposalList]);

    if (ProposalList.proposals && ProposalList.proposals.length === 0) {
        return (<Confirmation title={'My Proposals'} type={'LProposal'} setIndex={setIndex} />);
    }

    return (
        <React.Fragment>
        <PageHeader title={'My Proposals'} show={loading} className={'mb-4'}/>
        {showError && <Error content={info.content} variant={info.variant} setShowError={setShowError} />}
        <Card>
            <Card.Header className={'p-2 bg-white text-end'}>
                <Button className={'btn btn-sm btn-primary text-right'} onClick={() => setIndex(1)}><small>Create Proposal</small></Button>
            </Card.Header>
            <Card.Body>
        <Row>
            <Table responsive="md">
                <thead>
                    <tr>
                        <th></th>
                        <th>Company Name</th>
                        <th>Selling Price</th>
                        <th>Available</th>
                        <th>Date</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {ProposalList.proposals && ProposalList.proposals.map((proposal, key) => {
                    return (
                        <tr key={key}>
                            <td><Image src={'https://via.placeholder.com/20'} roundedCircle/></td>
                            <td>{proposal.companies.name}</td>
                            <td>{proposal.selling_price}</td>
                            <td>{proposal.available_of_shares}</td>
                            <td>{proposal.created_date}</td>
                            <td onClick={() => {setIndex(1);setProposalId(proposal.proposal_id)}}><FiEdit /></td>
                            <td><FiTrash /></td>
                        </tr>
                    )
                    })}    
                    </tbody>
            </Table>
        </Row>
        </Card.Body>
        </Card>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
      login: state.login || {},
      ProposalList: state.proposal.user || {}
    }
};
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        userProposalRequest
    }, dispatch);
};
  
export default connect(mapStateToProps, mapDispatchToProps)(LProposal);