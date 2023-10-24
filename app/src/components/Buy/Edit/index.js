import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {Col, Row, InputGroup, Form, Button, Card, ListGroup, ListGroupItem} from 'react-bootstrap';
import { useNavigate} from 'react-router-dom';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getProposalRequest } from '../../../db/action/proposal';
import { insertSharesRequest, boughtSharesRequest } from '../../../db/action/shares';
import { insertTransactionRequest } from '../../../db/action/transaction';
import { userWalletRequest } from '../../../db/action/wallet';
import { updateProposalRequest } from '../../../db/action/proposal';
import Confirmation from '../../Confirmation';
import { GrDocumentConfig } from 'react-icons/gr';
import { TbCircleDot } from 'react-icons/tb';
import {FaBuilding} from 'react-icons/fa';
import {isUndefined, isEmpty } from 'lodash';
import isNumeric from 'validator/es/lib/isNumeric';
import isEmail from 'validator/es/lib/isEmail';
import PageHeader from '../../PageHeader';
import Error from '../../Error';

const EBuy = (props) => {
    const {setIndex, login, ProposalCreate, 
        ProposalUpdate, ProposalGet, proposal_id, SharesBought,
        SharesList, WalletUser, TransactionCreate, SharesCreate } = props;
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [info, setInfo] = useState({
        content: '',
        variant: ''
    });
    const [proposal, setProposal] = useState({
        companies_id:'', 
        shares_id: '',
        available_of_shares: '',
        selling_price: '',
        created_by: login.user_id,
        proposal_id,
        companies: {},
        shares: {}
    });
    const [wallet, setWallet] = useState({});
    useEffect(() => {
        props.userWalletRequest({
            created_by: login.user_id
        });
        props.getProposalRequest({
            proposal_id
        });
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        const object = {...proposal};
        object[name] = value;
        setProposal(object);
    };

    const handleSubmit = () => {
        if (isEmpty(wallet) === true) {
            setInfo({
                ...info,
                  content: 'No balance in the wallet or wallet is missing',
                  variant: 'warning'
            });
            setShowError(true);
            console.log(wallet);
            console.log(props);
            return;  
        }
        if (isEmpty(proposal.available_of_shares) === true) {
            setInfo({
                ...info,
                  content: 'Please specify Shares to Sell',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        if (Number(proposal.selling_price) <= 0) {
            setInfo({
                ...info,
                  content: 'Please Specify the Price to Sell',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        if (Number(proposal.available_of_shares) > Number(proposal.companies.available_of_shares)) {
            setInfo({
                ...info,
                  content: 'Your exceeding total number of Shares',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        const price = Number(proposal.available_of_shares) * Number(proposal.selling_price);
        if ( price > Number(wallet.balance)) {
            setInfo({
                ...info,
                  content: 'You do not have a sufficient Dots ( price ) in order to purchase this share.',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        setLoading(true);
        props.insertTransactionRequest({
            created_by: login.user_id,
            number_of_shares: proposal.available_of_shares,
            companies_id: proposal.companies_id,
            from_id: login.user_id,
            to_id: proposal.created_by,
            total_amount: (Number(proposal.available_of_shares) * Number(proposal.selling_price)),
            share_price: proposal.selling_price
        });
    }

    useEffect(() => {
        const { success } = TransactionCreate;
        if(isUndefined(success)) {
            return false;
        }
        if(success === true) {
            props.insertSharesRequest({
                created_by: login.user_id,
                number_of_shares: Number(proposal.available_of_shares),
                companies_id: proposal.companies_id,
                base_price: proposal.selling_price
            });
        }
    }, [TransactionCreate]);

    useEffect(() => {
        const { proposal, success, message } = ProposalGet;
        if(isUndefined(success)) {
            return false;
        }
        if(isUndefined(proposal && proposal.companies_id) === false) {
            const object = {...proposal};
            setProposal(object);
            setLoading(false);
            setWallet(WalletUser.wallet);
        }
    }, [ProposalGet]);

    useEffect(() => {
        const { wallet, success, message } = WalletUser;
        if(isUndefined(success)) {
            return false;
        }
        if(isUndefined(wallet) === false) {
            const object = {...wallet};
            setLoading(false);
            setWallet(object);
        }
    }, [WalletUser]);

    useEffect(() => {
        const { success, shares } = SharesCreate;
        if(isUndefined(success)) {
            return false;
        }
        if(success === true) {
            props.boughtSharesRequest({
                from_shares_id: proposal.shares.shares_id,
                to_available_of_shares: proposal.available_of_shares
            });
        }
    }, [SharesCreate]);

    useEffect(() => {
        const { success } = SharesBought;
        if(isUndefined(success)) {
            return false;
        }
        if(success === true) {
            const proposalBack = ProposalGet.proposal;
            const data = {
                ...proposalBack,
                ...proposal
            }
            data.available_of_shares = proposalBack.available_of_shares - proposal.available_of_shares;
            props.updateProposalRequest(data);
            setActiveIndex(1);
        }
    }, [SharesBought]);
    if(activeIndex === 1) {
        return (
            <Confirmation title={'Shares Bought'} type={'EBuy'} />
        )
    };
    
    if(activeIndex === 0) {
        return (
            <React.Fragment>
            <PageHeader title={`${!!(proposal_id) === true ? 'Process Buying' : 'Process Buying'}`} show={loading} className={'mb-4'}/>
            {showError && <Error content={info.content} variant={info.variant} setShowError={setShowError} />}
            <Card border={'light'} className={'border-0'}>
                { isEmpty(proposal_id) === false  && 
                <Form.Group className={'mb-3 border ew-border-gradient p-4'}>    
                <ListGroup>
                    <ListGroup.Item className={'border border-success m-2'}>
                    <Form.Group className={'border-0'}>
                        <InputGroup>
                        <InputGroup.Text className={'bg-white border-0'}><FaBuilding /></InputGroup.Text>
                        <Form.Control  size={'lg'}  
                            readOnly
                            className={'bg-white border-0'} required
                            defaultValue={proposal.companies.name} name={'company_name'} />
                        <InputGroup.Text className={'bg-white border-0'}>{proposal.companies.short_name}</InputGroup.Text>
                        </InputGroup>
                    </Form.Group> 
                    </ListGroup.Item>
                </ListGroup>
                </Form.Group> }
                <Form.Group className={'mb-3 border ew-border-gradient'}>
                    <InputGroup>
                    <InputGroup.Text className={'bg-white border-0'}><GrDocumentConfig /></InputGroup.Text>
                    <Form.Control  size={'lg'} 
                        className={'border-0'} required
                        placeholder={'Available Shares'} 
                        defaultValue={proposal.available_of_shares} 
                        name={'available_of_shares'} 
                        onChange={(event) => handleChange(event)}/> 
                    </InputGroup>
                </Form.Group>
                <Form.Group className={'mb-3 border ew-border-gradient'}>
                <InputGroup>
                    <InputGroup.Text className={'bg-white border-0'}><TbCircleDot /></InputGroup.Text>
                    <Form.Control  size={'lg'} 
                        readOnly
                        className={'border-0 bg-white'} required
                        placeholder={'Selling Price'} 
                        defaultValue={proposal.selling_price} 
                        name={'selling_price'} 
                        onChange={(event) => handleChange(event)}/> 
                    <InputGroup.Text className={'bg-white border-0'}>DOTS</InputGroup.Text>    
                    </InputGroup>
                </Form.Group>
                <Form.Group className={'mt-2'}>
                    <Row>
                        <Col md={4}>
                        <Button className={'btn btn-primary'}
                            onClick={() => handleSubmit()}
                        >Submit</Button>
                        </Col>
                    </Row>
                </Form.Group>
            </Card>
            </React.Fragment>
        )
    }   
}

const mapStateToProps = (state) => {
    return {
      login: state.login || {},
      SharesCreate: state.shares.insert || {},
      TransactionCreate: state.transaction.insert || {},
      SharesBought: state.shares.bought || {},
      WalletUser: state.wallet.user || {},
      ProposalGet: state.proposal.get || {},
      ProposalCreate: state.proposal.insert || {},
      ProposalUpdate: state.proposal.update || {}
    }
};
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        boughtSharesRequest,
        insertTransactionRequest,
        insertSharesRequest,
        getProposalRequest,
        updateProposalRequest,
        userWalletRequest
    }, dispatch);
};
  
export default connect(mapStateToProps, mapDispatchToProps)(EBuy);