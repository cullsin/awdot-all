import React, {useState, useEffect} from 'react';
import {Col, Row, InputGroup, Form, Button, Card, Table, ListGroup} from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { insertRedeemRequest, feeRedeemRequest,updateRedeemRequest } from '../../../db/action/redeem';
import { stripeTransferRequest } from '../../../db/action/stripe';
import { userProfileRequest } from '../../../db/action/profile';
import { userFileConnectRequest } from '../../../db/action/file';
import { getBankRequest } from '../../../db/action/bank';
import { MdOutlineStickyNote2 } from 'react-icons/md';
import { TbAddressBook } from 'react-icons/tb';
import { FaCity } from 'react-icons/fa';
import { FcPhone } from 'react-icons/fc';
import {HiOutlineGlobe} from 'react-icons/hi';
import {BsFillSignpostFill} from 'react-icons/bs';
import { userWalletRequest } from '../../../db/action/wallet';
import {isUndefined, isEmpty, isMatch, isString } from 'lodash'
import PageHeader from '../../PageHeader';
import Confirmation from '../../Confirmation';
import Error from '../../Error';
import isNumeric from 'validator/es/lib/isNumeric';

const ERedeem = (props) => {
    const { stripe, login, RedeemCreate, WalletUser, 
        ProfileGet, BanksList, FilesList, StripeTransfer, RedeemUpdate } = props;
    const [isStripe, setShowStripe] = useState(false);
    const [page, setPage] = useState(0);
    const [isDone, setDone] = useState(false);
    const navigate = useNavigate();
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState({
        content: '',
        variant: ''
    });
    const [redeem, setRedeem] = useState({
        actual_amount: '',
        number_of_dots: '',
        transaction_amount: 0,
        currency:'',
        total_amount: 0,
        created_by: login.user_id,
        bank_id: ''
    });
    
    const handleChange = (e,option) => {
        const {name, value} = e.target;
        let object = {...redeem};
        object[name] = value;
        if(name === 'actual_amount') {
            let transaction_amount = Number(object.actual_amount * (props.fee.fee.transactionFee / 100));
            object.transaction_amount = transaction_amount; 
            object.number_of_dots = object.actual_amount;
            object.total_amount = object.actual_amount - object.transaction_amount;
        }
        if (option) {
            object.currency = option.bank_currency;
        }
        setRedeem(object);
    };

    const handleSubmit = () => {
        if (isEmpty(redeem.bank_id) === true) {
            setInfo({
                ...info,
                    content: 'Please Select the Bank Account',
                    variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        const data = {...redeem};
        setLoading(true);
        props.insertRedeemRequest(data);
    }

    useEffect(() => {
        setLoading(true);
        props.feeRedeemRequest();
        props.userProfileRequest();
        props.userFileConnectRequest({
            connect_id: login.user_id,
            connect_type: 'user-identity' });
       props.getBankRequest({});
       props.userWalletRequest({
        created_by: login.user_id
       });
    }, []);

    useEffect(() => {
        const {success, code, message} = StripeTransfer;
        if(isUndefined(success)) {
            return false;
        }
        if(success === true) { 
            props.updateRedeemRequest({
                redeem_id: RedeemCreate.redeem.redeem_id,
                is_active: true
            });
        } else {
            setInfo({
                ...info,
                    content: `${code} - ${message}`,
                    variant: 'warning'
            });
            setShowError(true);
            setLoading(false);
        } 
    }, [StripeTransfer]);

    useEffect(() => {
        const {success, code, message} = RedeemCreate;
        if(isUndefined(success)) {
            return false;
        }
        if(success === true) { 
            setLoading(true);
            const bank = BanksList.filter(item => item.id === redeem.bank_id)[0];
            const file = FilesList.filter(item => item.file.category === 'user-identity')[0];
            const data = {
                redeem, bank, file, 
                profile: ProfileGet.profile, 
                user: login
            }
            setLoading(true);
            props.stripeTransferRequest(data);
        } else {
            setInfo({
                ...info,
                    content: `${code} - ${message}`,
                    variant: 'warning'
            });
            setShowError(true);
            setLoading(false);
        } 
    }, [RedeemCreate]);

    
    useEffect(() => {
        const {success, code, message} = RedeemUpdate;
        if(isUndefined(success)) {
            return false;
        }
        if(success === true) { 
            setLoading(false);
            setDone(true);
        } else {
            setInfo({
                ...info,
                    content: `${code} - ${message}`,
                    variant: 'warning'
            });
            setShowError(true);
            setLoading(false);
        } 
    }, [RedeemUpdate]);

    const handleAmount = () => {
        if (isEmpty(redeem.actual_amount.toString()) === true) {
            setInfo({
                ...info,
                    content: 'Please specify Amount',
                    variant: 'warning'
            });
            setShowError(true);
            return;  
        }

        if (Number(redeem.actual_amount) <= 0) {
            setInfo({
                ...info,
                    content: 'Please specify Amount more than 0.00',
                    variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        if ( redeem.actual_amount > Number(WalletUser.wallet && WalletUser.wallet.balance)) {
            setInfo({
                ...info,
                  content: 'You do not have a sufficient Dots ( price ) in order to redeen this.',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        setPage(1);
    }
    if(isDone === true) {
        return (<Confirmation type={'SSRedeem'} title={'Redeem Successful'} />);
    } 
    if(page === 0) {
        return (
            <React.Fragment>
            <PageHeader title={'Set Redeem Dots'} show={false} className={'mb-4'}/>
            {showError && <Error content={info.content} variant={info.variant} setShowError={setShowError} />}
            <Card border={'light'} className={'border-0'}>
            <Form.Group className={'mb-3 border ew-border-gradient'}>
                <InputGroup>
                <InputGroup.Text className={'bg-white border-0'}><MdOutlineStickyNote2 /></InputGroup.Text>
                <Form.Control  size={'lg'} 
                    className={'border-0 w-25 p-0'} required
                    placeholder={'Amount'} 
                    defaultValue={redeem.actual_amount} 
                    name={'actual_amount'} 
                    onChange={(event) => handleChange(event)}/>
                </InputGroup>
            </Form.Group>
            <Form.Group className={'mt-2'}>
                <Row>
                    <Col md={4}>
                    <Button className={'btn btn-primary'}
                        onClick={() => handleAmount()}
                    >Next</Button>
                    </Col>
                </Row>
            </Form.Group>
            </Card>
            </React.Fragment>
        )    
    }
    if(page === 1) {
        return (
            <React.Fragment>
            <PageHeader title={'Invoice'} show={false} className={'mb-4'}/>
            {showError && <Error content={info.content} variant={info.variant} setShowError={setShowError} />}
            <Card border={'light'} className={'border-0'}>
                        <Table responsive="md">
                            <tbody>
                            <tr>
                                <th>Amount</th>
                                <td>{redeem.actual_amount}</td>
                            </tr>
                            <tr>
                                <th>Transaction Fee</th>
                                <td>{Number(redeem.transaction_amount)}</td>
                            </tr>
                            <tr>    
                                <th>Total</th>
                                <td>{redeem.total_amount}</td>
                            </tr>
                            </tbody>
                        </Table>
                        <Form.Group className={'m-2'}>
                        <Row>
                            <Col md={4}>
                                <Button className={'btn btn-primary'} onClick={() => setPage(2)} >Next</Button>
                            </Col>
                            <Col md={8} className={'justify-content-end d-flex align-items-end col-md-8'}>
                                <Button className={'btn btn-success'} onClick={() => setPage(0)} >Back</Button>
                            </Col>
                        </Row>
                </Form.Group>    
                </Card>                
            </React.Fragment>
        )
    }
    if(page === 2) {
        return (
            <React.Fragment>
                { isEmpty(ProfileGet.profile && ProfileGet.profile.gov_id) === true && <Card border={'light'} className={'border-0'}>
                    <Form.Group className={'mb-3 border ew-border-gradient p-4'}>
                        <div><center><span>You did not complete the profile. Please Update</span></center></div>
                        <div className={'mb-2'}><center>Click the Link Below</center></div>
                        <div><center><Link to={'/profile'}> Profile </Link></center></div>
                    </Form.Group>
                </Card>}
                { FilesList.length === 0 && <Card border={'light'} className={'border-0'}>
                    <Form.Group className={'mb-3 border ew-border-gradient p-4'}>
                        <div><center><span>You did not complete the KYC. Please upload your 'Identification' Documents</span></center></div>
                        <div className={'mb-2'}><center>Click the Link Below</center></div>
                        <div><center><Link to={'/file'}> Upload KYC </Link></center></div>
                    </Form.Group>
                </Card>}
                {BanksList.length === 0 && <Card border={'light'} className={'border-0'}>
                    <Form.Group className={'mb-3 border ew-border-gradient p-4'}>
                        <div><center><span>You did not Register any Bank Account. Please Register atleast one</span></center></div>
                        <div><center>Click the Button Below</center></div>
                        <div><center><Link to={'/bank'}> Add Bank </Link></center></div>
                    </Form.Group>
                </Card>}
                <PageHeader title={'Configure Bank'} show={loading} className={'mb-4'}/>
                {showError && <Error content={info.content} variant={info.variant} setShowError={setShowError} />}
                {BanksList.length > 0 && <Card border={'light'} className={'border-0'}>
                <Form.Group className={'mb-3 border ew-border-gradient p-4'}>
                <Form.Label>Select Bank</Form.Label>    
                <ListGroup>
                {BanksList && BanksList.map((bank, key) => {
                    return(
                        <ListGroup.Item className={'border border-success m-2'} key={key}>
                        <Form.Group className={'border-0'}>
                            <InputGroup>
                            <InputGroup.Radio 
                                value={bank.bank_id}
                                className={'border-0'} 
                                name={'bank_id'} 
                                onChange={(event) => handleChange(event, bank)}></InputGroup.Radio>
                            <Form.Control  size={'lg'}  
                                readOnly
                                className={'bg-white border-0'} required
                                defaultValue={bank.bank_account_name} name={'bank_account_name'} />
                            <InputGroup.Text className={'bg-white border-0'}>{bank.bank_currency}</InputGroup.Text>
                            </InputGroup>
                        </Form.Group> 
                        </ListGroup.Item>
                    )
                })}
                </ListGroup>
                </Form.Group>
                <Form.Group className={'m-2'}>
                    <Row>
                        <Col md={4}>
                            <Button className={'btn btn-primary'} onClick={() => handleSubmit()} >Submit</Button>
                        </Col>
                        <Col md={8} className={'justify-content-end d-flex align-items-end col-md-8'}>
                            <Button className={'btn btn-success'} onClick={() => setPage(1)} >Back</Button>
                        </Col>
                    </Row>
                </Form.Group> 
                </Card>}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      login: state.login || {},
      WalletUser: state.wallet.user || {},
      FilesList: state.file.user && state.file.user.files,
      BanksList: (state.bank.get && state.bank.get.banks) || [],  
      RedeemUpdate: state.redeem.update || {},
      ProfileGet: state.profile.user || {},
      StripeTransfer: state.stripe.transfer || {},
      RedeemCreate: state.redeem.insert || {},
      fee: state.redeem.fee || {}
    }
  };
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        insertRedeemRequest,
        getBankRequest,
        userProfileRequest,
        stripeTransferRequest,
        feeRedeemRequest,
        userFileConnectRequest,
        userWalletRequest,
        updateRedeemRequest
    }, dispatch);
};
  
export default connect(mapStateToProps, mapDispatchToProps)(ERedeem);