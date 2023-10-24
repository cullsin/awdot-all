import React, {useState, useEffect} from 'react';
import {Card, InputGroup, Form, Button, ListGroup, Badge} from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createBankRequest, getBankRequest, deleteBankRequest, initBankRequest } from '../../db/action/bank';
import { Typeahead } from 'react-bootstrap-typeahead';
import { MdOutlineStickyNote2 } from 'react-icons/md';
import currencyCodeJson from '../../data/Currency/index.json';
import countryCodeJson from '../../data/PhoneCode/index.json';
import {MdOutlineAccountTree} from 'react-icons/md';
import {AiOutlineNumber} from 'react-icons/ai';
import {CgRename} from 'react-icons/cg';
import {RiBankLine} from 'react-icons/ri';
import { BiGlobeAlt } from 'react-icons/bi';
import {isUndefined, isString, isEmpty} from 'lodash';
import PageHeader from '../PageHeader';
import Error from '../Error';


currencyCodeJson = Object.keys(currencyCodeJson).map((item) => {
    return { code: currencyCodeJson[item].code }
});

const RegisterBankAccount = (props) => {
    const {createBank, deleteBank, getBank} = props;
    const [bank, setBank] = useState({
        bank_name: '', 
        branch_id: '', 
        bank_account_no:'',
        bank_account_name:'',
        bank_currency: [],
        bank_country:[]
    });
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingList, setLoadingList] = useState(false);
    const [info, setInfo] = useState({
        content: '',
        variant: ''
    });
    const handleChange = (e) => {
        const {name, value} = e.target;
        const object = {...bank};
        object[name] = value;
        setBank(object);
    };

    const handleCurrencyCode = (valueMixed) => {
        const object = {...bank};
        object.bank_currency = valueMixed.length ? [valueMixed[0].code]: [];
        setBank(object); 
    };

    const handleBankCountry = (valueMixed) => {
        const object = {...bank};
        object.bank_country = valueMixed.length ? [valueMixed[0].code]: [];
        setBank(object); 
    };

    const handleSubmit = () => {
        if (isEmpty(bank.bank_name) === true) {
            setInfo({
                ...info,
                  content: 'Please give me Bank name',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        if (isEmpty(bank.branch_id) === true) {
            setInfo({
                ...info,
                  content: 'Please give me Bank Route',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        if (isEmpty(bank.bank_account_name) === true) {
            setInfo({
                ...info,
                  content: 'Please give me Name of an Account',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        if (isEmpty(bank.bank_account_no) === true) {
            setInfo({
                ...info,
                  content: 'Please give me Bank Account No',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        if (bank.bank_currency[0].length === 0) {
            setInfo({
                ...info,
                  content: 'Please Select your Currency',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        if (bank.bank_country.length === 0) {
            setInfo({
                ...info,
                  content: 'Please Select Origin of the Bank - Country',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        setLoading(true);
        const data = {...bank};
        data.bank_currency = bank.bank_currency[0];
        data.bank_country = bank.bank_country[0];
        props.createBankRequest(data);
    }
    
    useEffect(() => {
        setLoadingList(true);
        props.initBankRequest();
        props.getBankRequest();
    }, []);

    useEffect(() => {
        const {success, code, message} = createBank;
        if(isUndefined(success)) {
            return false;
        }
        if(success === true) { 
            setLoading(false);
            setLoadingList(true);
            props.getBankRequest();
        } else {
            setInfo({
                ...info,
                    content: `${code} - ${message}`,
                    variant: 'warning'
            });
            setShowError(true);
            setLoading(false);
        } 
    }, [createBank]);
    
    useEffect(() => {
        const {success, code, message} = deleteBank;
        if(isUndefined(success)) {
            return false;
        }
        if(success === true) {
            setLoadingList(true); 
            props.getBankRequest();
        } else {
            setInfo({
                ...info,
                    content: `${code} - ${message}`,
                    variant: 'warning'
            });
            setShowError(true);
            setLoading(false);
        } 
    }, [deleteBank]);

    useEffect(() => {
        const {success, code, message} = getBank;
        if(isUndefined(success)) {
            return false;
        }
        if(success === true) {
            setLoadingList(false);
        } else {
            setInfo({
                ...info,
                    content: `${code} - ${message}`,
                    variant: 'warning'
            });
            setShowError(true);
            setLoading(false);
        } 
    }, [getBank]);

    return (
        <React.Fragment>
        <PageHeader title={'Add Bank Account Details'} show={loading} className={'mb-4'}/>
        {showError && <Error content={info.content} variant={info.variant} setShowError={setShowError} />}
        <Card border={'light'} className={'border-0'}>
            <Form.Group className={'mb-2 border ew-border-gradient'}>
                <InputGroup>
                <InputGroup.Text className={'bg-white border-0'}><RiBankLine /></InputGroup.Text>
                <Form.Control  size={'lg'} placeholder={'Bank Name'}
                    className={'border-0'} required 
                    defaultValue={bank.bank_name} name={'bank_name'} onChange={(event) => handleChange(event)} /> 
                </InputGroup>
            </Form.Group>
            <Form.Group className={'mb-2 border ew-border-gradient'}>
                <InputGroup>
                <InputGroup.Text className={'bg-white border-0'}><AiOutlineNumber /></InputGroup.Text>
                <Form.Control  size={'lg'} placeholder={'IFSC CODE | Route Number'} 
                    className={'border-0'} required
                    defaultValue={bank.branch_id} name={'branch_id'} onChange={(event) => handleChange(event)} /> 
                </InputGroup>
            </Form.Group>
            <Form.Group className={'mb-2 border ew-border-gradient'}>
                <InputGroup>
                <InputGroup.Text className={'bg-white border-0'}><CgRename /></InputGroup.Text>
                <Form.Control  size={'lg'} placeholder={'Account Name'} 
                    className={'border-0'} required
                    defaultValue={bank.bank_account_name} name={'bank_account_name'} onChange={(event) => handleChange(event)} /> 
                </InputGroup>
            </Form.Group>
            <Form.Group className={'mb-2 border ew-border-gradient'}>
                <InputGroup>
                <InputGroup.Text className={'bg-white border-0'}><MdOutlineAccountTree /></InputGroup.Text>
                <Form.Control  size={'lg'} placeholder={'Account No'} 
                    className={'border-0'} required
                    defaultValue={bank.bank_account_no} name={'bank_account_no'} onChange={(event) => handleChange(event)} /> 
                </InputGroup>
            </Form.Group>
            <Form.Group className={'mb-3 border ew-border-gradient'}>
                <InputGroup>
                <InputGroup.Text className={'bg-white border-0'}><BiGlobeAlt /></InputGroup.Text>
                <Typeahead
                    multiple={false}
                    id='ew-bank-country'
                    className={'border-0'}
                    labelKey="code"
                    onChange={(value) => handleBankCountry(value)}
                    options={countryCodeJson}
                    placeholder="Country Code"
                    selected={bank.bank_country}
                />
                </InputGroup>
            </Form.Group>
            <Form.Group className={'mb-3 border ew-border-gradient'}>
                <InputGroup>
                <InputGroup.Text className={'bg-white border-0'}><MdOutlineStickyNote2 /></InputGroup.Text>
                <Typeahead
                    multiple={false}
                    id='bank-currency'
                    className={'border-0 w-50'}
                    labelKey="code"
                    onChange={(value) => handleCurrencyCode(value)}
                    options={currencyCodeJson}
                    placeholder="Currency Code"
                    selected={bank.bank_currency}
                />
                </InputGroup>
            </Form.Group>
            <Form.Group className={'mt-2'}>
                <Button onClick={() => handleSubmit()}>
                    Submit
                  </Button>
            </Form.Group>      
        </Card>
        <PageHeader title={'Banks'} show={loadingList} className={'mt-5'}/>
        <Card border={'light'} className={'border-0'}>
            {getBank.banks && getBank.banks.length > 0 && Object.keys(getBank.banks).map((item) => {
                  const bank = getBank.banks[item];  
                  return (<ListGroup.Item><Badge bg={'success'} className={'m-2 mb-0 mt-0'}>{bank.bank_name}</Badge><span>{bank.bank_account_no}</span>
                    <span className={'float-end'} onClick={() => props.deleteBankRequest({bank_id:bank.id})}>
                        <i className="bi bi-trash3"></i>
                    </span><Badge bg={'success'} className={'m-2 mb-0 mt-0'}>{bank.bank_country}</Badge></ListGroup.Item>);  
            })}
        </Card>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
      createBank: state.bank.create || {},
      deleteBank: state.bank.delete || {}, 
      getBank: state.bank.get || [],
      login: state.login || {}
    }
  };
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        initBankRequest,
        createBankRequest, 
        getBankRequest, 
        deleteBankRequest
    }, dispatch);
};
  
export default connect(mapStateToProps, mapDispatchToProps)(RegisterBankAccount);