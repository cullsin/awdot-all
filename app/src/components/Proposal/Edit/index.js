import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {Col, Row, InputGroup, Form, Button, Card, ListGroup, ListGroupItem} from 'react-bootstrap';
import { useNavigate} from 'react-router-dom';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { insertProposalRequest, getProposalRequest, updateProposalRequest } from '../../../db/action/proposal';
import { userSharesRequest } from '../../../db/action/shares';
import Confirmation from '../../Confirmation';
import { GrDocumentConfig } from 'react-icons/gr';
import { TbCircleDot } from 'react-icons/tb';
import {FaBuilding} from 'react-icons/fa';
import {isUndefined, isEmpty } from 'lodash';
import isNumeric from 'validator/es/lib/isNumeric';
import isEmail from 'validator/es/lib/isEmail';
import PageHeader from '../../PageHeader';
import Error from '../../Error';

const EProposal = (props) => {
    const {setIndex, login, ProposalCreate, ProposalUpdate, ProposalGet, proposal_id, SharesList } = props;
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
        proposal_id
    });
    const [shares, setShares] = useState({});
    useEffect(() => {
        props.userSharesRequest({
            created_by: login.user_id
        });
    }, []);

    const handleChange = (e, option) => {
        const {name, value} = e.target;
        const object = {...proposal};
        object[name] = value;
        if (option) {
            object['companies_id'] = option.companies_id;
            const ob = {...option};
            setShares(ob);
        }
        setProposal(object);
    };

    const handleSubmit = () => {
        if (isEmpty(proposal.companies_id) === true) {
            setInfo({
                ...info,
                  content: 'Please Select Company',
                  variant: 'warning'
            });
            setShowError(true);
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
        if (Number(proposal.available_of_shares) > Number(shares.number_of_shares)) {
            setInfo({
                ...info,
                  content: 'Your exceeding total number of Shares',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        
       setLoading(true);
       const data = {...proposal};
       if (isUndefined(proposal_id) === false) {
        props.updateProposalRequest(data);
       } else {
        props.insertProposalRequest(data);
       }
    }
    
    useEffect(() => {
        const {success, code, message, proposal} = ProposalCreate;
        if(isUndefined(success)) {
            return false;
        }
        if(success === true) { 
            setActiveIndex(1); 
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
    }, [ProposalCreate]);

    useEffect(() => {
        const {success, code, message, proposal} = ProposalUpdate;
        if(isUndefined(success)) {
            return false;
        }
        if(success === true) { 
            setActiveIndex(1); 
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
    }, [ProposalUpdate]);

    useEffect(() => {
        const { proposal, success, message } = ProposalGet;
        if(isUndefined(success)) {
            return false;
        }
        if(isUndefined(proposal && proposal.companies_id) === false) {
            const object = {...proposal};
            setProposal(object);
            setLoading(false);
            SharesList.shares && SharesList.shares.map((share) => {
                if(share.shares_id === object.shares_id) {
                    setShares(share);
                }
            })
        }
    }, [ProposalGet]);

    useEffect(() => {
        const { success } = SharesList;
        if(isUndefined(success)) {
            return false;
        }
        if(success === true) {
            if (isEmpty(proposal_id) === false) {
                setLoading(true);
                props.getProposalRequest({
                    proposal_id
                });
            }
        }
    }, [SharesList]);

    if(SharesList.shares && props.SharesList.shares.length === 0) {
        return (
            <Confirmation title={'Register Company First'} type={'EProposal'} />
        )
    }
    if(activeIndex === 1) {
        return (
            <Confirmation title={'Proposal Registered'} type={'Proposal'} />
        )
    };
    
    if(activeIndex === 0) {
        return (
            <React.Fragment>
            <PageHeader title={`${!!(proposal_id) === true ? 'Update Proposal' : 'Register Proposal'}`} show={loading} className={'mb-4'}/>
            {showError && <Error content={info.content} variant={info.variant} setShowError={setShowError} />}
            <Card border={'light'} className={'border-0'}>
            { isEmpty(proposal_id) === true && <Form.Group className={'mb-3 border ew-border-gradient p-4'}>
                <Form.Label>Select Company</Form.Label>    
                <ListGroup>
                {SharesList.shares && SharesList.shares.map((share, key) => {
                    return(
                        <ListGroup.Item className={'border border-success m-2'} key={key}>
                        <Form.Group className={'border-0'}>
                            <InputGroup>
                            <InputGroup.Radio 
                                checked={share.id === proposal.shares_id}
                                value={share.id}
                                className={'border-0'} 
                                name={'shares_id'} 

                                onChange={(event) => handleChange(event, share)}></InputGroup.Radio>
                            <Form.Control  size={'lg'}  
                                readOnly
                                className={'bg-white border-0'} required
                                defaultValue={share.companies.name} name={'company_name'} />
                            <InputGroup.Text className={'bg-white border-0'}>{share.number_of_shares}</InputGroup.Text>
                            </InputGroup>
                        </Form.Group> 
                        </ListGroup.Item>
                    )
                })}
                </ListGroup>
                </Form.Group> }
                { isEmpty(proposal_id) === false && shares.shares_id && <Form.Group className={'mb-3 border ew-border-gradient p-4'}>    
                <ListGroup>
                    <ListGroup.Item className={'border border-success m-2'}>
                    <Form.Group className={'border-0'}>
                        <InputGroup>
                        <InputGroup.Text className={'bg-white border-0'}><FaBuilding /></InputGroup.Text>
                        <Form.Control  size={'lg'}  
                            readOnly
                            className={'bg-white border-0'} required
                            defaultValue={shares.companies.name} name={'company_name'} />
                        <InputGroup.Text className={'bg-white border-0'}>{shares.number_of_shares}</InputGroup.Text>
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
                        className={'border-0'} required
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
      SharesList: state.shares.user || {},
      ProposalGet: state.proposal.get || {},
      ProposalCreate: state.proposal.insert || {},
      ProposalUpdate: state.proposal.update || {}
    }
};
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getProposalRequest,
        updateProposalRequest,
        insertProposalRequest,
        userSharesRequest
    }, dispatch);
};
  
export default connect(mapStateToProps, mapDispatchToProps)(EProposal);