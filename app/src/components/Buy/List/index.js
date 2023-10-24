import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {Col, Row, InputGroup, Form, Button, Card, Table, Image} from 'react-bootstrap';
import { useNavigate} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {isUndefined } from 'lodash';
import {FiEdit, FiTrash} from 'react-icons/fi';
import Confirmation from '../../Confirmation';
import { listProposalRequest } from '../../../db/action/proposal';
import PageHeader from '../../PageHeader';
import Error from '../../Error';
import { TbCircleDot } from 'react-icons/tb';
const LBuy = (props) => {
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
        props.listProposalRequest({});
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
        return (<Confirmation title={'Exchange'} type={'LBuy'} setIndex={setIndex} />);
    }

    return (
        <React.Fragment>
        <PageHeader title={'Open Exchange'} show={loading} className={'mb-4'}/>
        {showError && <Error content={info.content} variant={info.variant} setShowError={setShowError} />}
        <Row>
            <Table responsive="md">
                <thead>
                    <tr>
                        <th></th>
                        <th>Index</th>
                        <th>Company Name</th>
                        <th>Selling Price</th>
                        <th>Available</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {ProposalList.proposals && ProposalList.proposals.map((proposal, key) => {
                    return (
                        <tr key={key}>
                            <td><Image src={'https://via.placeholder.com/20'} roundedCircle/></td>
                            <td>{proposal.companies.short_name}</td>
                            <td>{proposal.companies.name}</td>
                            <td>{proposal.selling_price} <TbCircleDot /></td>
                            <td>{proposal.available_of_shares}</td>
                            <td onClick={() => {setIndex(1);setProposalId(proposal.proposal_id)}}>
                                <Button className={'btn btn-sm btn-primary'} onClick={() => setIndex(1)}><small>Buy</small></Button>  
                            </td>
                        </tr>
                    )
                    })}    
                    </tbody>
            </Table>
        </Row>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
      login: state.login || {},
      ProposalList: state.proposal.list || {}
    }
};
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        listProposalRequest
    }, dispatch);
};
  
export default connect(mapStateToProps, mapDispatchToProps)(LBuy);