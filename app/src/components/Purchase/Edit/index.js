import React, {useState, useEffect} from 'react';
import {Col, Row, InputGroup, Form, Button, Card, Table} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Typeahead } from 'react-bootstrap-typeahead';
import currencyCodeJson from '../../../data/Currency/index.json';
import { insertPurchaseRequest, feePurchaseRequest } from '../../../db/action/purchase';
import { generateStripeClientKeyRequest } from '../../../db/action/stripe';
import { userProfileRequest } from '../../../db/action/profile';
import { StripeScreen } from '../../Stripe/Screen';
import { MdOutlineStickyNote2 } from 'react-icons/md';
import { TbAddressBook } from 'react-icons/tb';
import { FaCity } from 'react-icons/fa';
import { FcPhone } from 'react-icons/fc';
import {HiOutlineGlobe} from 'react-icons/hi';
import {BsFillSignpostFill} from 'react-icons/bs';
import {isUndefined, isEmpty, isMatch, isString } from 'lodash'
import PageHeader from '../../PageHeader';
import Confirmation from '../../Confirmation';
import Error from '../../Error';
import isNumeric from 'validator/es/lib/isNumeric';

currencyCodeJson = Object.keys(currencyCodeJson).map((item) => {
    return { code: currencyCodeJson[item].code }
});

const EPurchase = (props) => {
    const { stripe, login, PurchaseCreate, ProfileGet } = props;
    const [isStripe, setShowStripe] = useState(false);
    const [page, setPage] = useState(0);
    const navigate = useNavigate();
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState({
        content: '',
        variant: ''
    });
    const [purchase, setPurchase] = useState({
        actual_amount: '',
        number_of_dots: '',
        currency:[],
        purchase_method: 'card',
        transaction_amount: 0,
        purchase_type: 'DEPOSIT',
        total_amount: 0,
        created_by: login.user_id
    });
    
    const handleCurrencyCode = (valueMixed) => {
        const object = {...purchase};
        object.currency = valueMixed.length ? [valueMixed[0].code]: [];
        setPurchase(object); 
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        let object = purchase;
        object[name] = Number(value);
        if(name === 'actual_amount') {
            let transaction_amount = Number(object.actual_amount * (props.fee.fee.transactionFee / 100));
            object.transaction_amount = transaction_amount; 
            object.number_of_dots = object.actual_amount;
            object.total_amount = object.transaction_amount + object.actual_amount;
        }
        object[name] = Number(value);
        setPurchase({...purchase, object});
    };

    const handleSubmit = () => {
        const data = {...purchase};
        data.currency = data.currency[0];
        setLoading(true);
        props.insertPurchaseRequest(data);
    }

    useEffect(() => {
        setLoading(true);
        props.feePurchaseRequest();
        props.userProfileRequest();
    }, []);

    useEffect(() => {
        const {success, code, message, profile} = ProfileGet;
        if(isUndefined(success)) {
            return false;
        }
        if(success === true) { 
            setLoading(false);
            if (isUndefined(profile.gov_id) === true) {
                setPage(4);
            }
        } else {
            setInfo({
                ...info,
                    content: `${code} - ${message}`,
                    variant: 'warning'
            });
            setShowError(true);
            setLoading(false);
        } 
    }, [ProfileGet]);

    useEffect(() => {
        const {success, code, message} = stripe;
        if(isUndefined(success)) {
            return false;
        }
        if(success === true) { 
            setPage(2);
            setShowStripe(true);
        } else {
            setInfo({
                ...info,
                    content: `${code} - ${message}`,
                    variant: 'warning'
            });
            setShowError(true);
            setLoading(false);
        } 
    }, [stripe]);

    useEffect(() => {
        const {success, code, message, purchase} = PurchaseCreate;
        if(isUndefined(success)) {
            return false;
        }
        if(success === true) { 
            setLoading(true);
            const data = {
                amount: purchase.actual_amount,
                purchase_id: purchase.purchase_id,
                currency: purchase.currency,
                payment_method: 'card',
                ...login,
                ...ProfileGet.profile
            }
            props.generateStripeClientKeyRequest(data);
        } else {
            setInfo({
                ...info,
                    content: `${code} - ${message}`,
                    variant: 'warning'
            });
            setShowError(true);
            setLoading(false);
        } 
    }, [PurchaseCreate]);

    const handleAmount = () => {
        if (isEmpty(purchase.actual_amount.toString()) === true) {
            setInfo({
                ...info,
                    content: 'Please specify Amount',
                    variant: 'warning'
            });
            setShowError(true);
            return;  
        }

        if (Number(purchase.actual_amount) <= 0) {
            setInfo({
                ...info,
                    content: 'Please specify Amount more than 0.00',
                    variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        if (purchase.currency[0].length === 0) {
            setInfo({
                ...info,
                  content: 'Please Select your Currency',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        setPage(1);
    }
    if(page === 4) {
        return ( <Confirmation title={'Profile is Pending'} type={'PPurchase'} /> );
    }
    if(page === 0) {
        return (
            <React.Fragment>
            <PageHeader title={'Set Purchase Amount'} show={loading} className={'mb-4'}/>
            {showError && <Error content={info.content} variant={info.variant} setShowError={setShowError} />}
            <Card border={'light'} className={'border-0'}>
            <Form.Group className={'mb-3 border ew-border-gradient'}>
                <InputGroup>
                <InputGroup.Text className={'bg-white border-0'}><MdOutlineStickyNote2 /></InputGroup.Text>
                <Form.Control  size={'lg'} 
                    className={'border-0 w-25 p-0'} required
                    placeholder={'Amount'} 
                    defaultValue={purchase.actual_amount} 
                    name={'actual_amount'} 
                    onChange={(event) => handleChange(event)}/>
                <Typeahead
                    multiple={false}
                    id='ew-currency'
                    className={'border-0 w-50'}
                    labelKey="code"
                    onChange={(value) => handleCurrencyCode(value)}
                    options={currencyCodeJson}
                    placeholder="Currency Code"
                    selected={purchase.currency}
                />
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
            <PageHeader title={'Invoice'} show={loading} className={'mb-4'}/>
            {showError && <Error content={info.content} variant={info.variant} setShowError={setShowError} />}
            <Card border={'light'} className={'border-0'}>
                        <Table responsive="md">
                            <tbody>
                            <tr>
                                <th>Amount</th>
                                <td>{purchase.actual_amount}{' ' + purchase.currency[0].toUpperCase()}</td>
                            </tr>
                            <tr>
                                <th>Transaction Fee</th>
                                <td>{Number(purchase.transaction_amount)}{' ' + purchase.currency[0].toUpperCase()}</td>
                            </tr>
                            <tr>    
                                <th>Total</th>
                                <td>{purchase.total_amount}{' ' + purchase.currency[0].toUpperCase()}</td>
                            </tr>
                            </tbody>
                        </Table>
                        <Form.Group className={'m-2'}>
                        <Row>
                            <Col md={4}>
                                <Button className={'btn btn-primary'} onClick={() => handleSubmit()} >Pay</Button>
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
                <PageHeader title={'Payment Gateway'} show={false} className={'mb-4'}/>
                {showError && <Error content={info.content} variant={info.variant} setShowError={setShowError} />}
                <Card border={'light'} className={'border-0'}>
                    <StripeScreen 
                        setPage={setPage}
                        client_secret={props.stripe.stripeInstance.client_secret} 
                        purchase_id={PurchaseCreate.purchase.purchase_id} />
                </Card>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      login: state.login || {},
      stripe: state.stripe.client || {},  
      ProfileGet: state.profile.user || {},
      PurchaseCreate: state.purchase.insert || {},
      fee: state.purchase.fee || {}
    }
  };
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        insertPurchaseRequest,
        userProfileRequest,
        generateStripeClientKeyRequest,
        feePurchaseRequest
    }, dispatch);
};
  
export default connect(mapStateToProps, mapDispatchToProps)(EPurchase);