import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {Col, Row, InputGroup, Form, Button, Card, ListGroup, ListGroupItem} from 'react-bootstrap';
import { useNavigate} from 'react-router-dom';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Typeahead } from 'react-bootstrap-typeahead';
import PhoneCodeJson from '../../../data/PhoneCode/index.json';
import { insertInvestmentRequest, getInvestmentRequest, updateInvestmentRequest } from '../../../db/action/investment';
import File from '../../File';
import Confirmation from '../../Confirmation';
import { HiOutlineMail } from 'react-icons/hi';
import { CgRename, CgShortcut } from 'react-icons/cg';
import { TbAddressBook } from 'react-icons/tb';
import { TbCircleDot } from 'react-icons/tb';
import { FcPhone } from 'react-icons/fc';
import {TbGenderEpicene} from 'react-icons/tb';
import {isUndefined, isEmpty } from 'lodash';
import isNumeric from 'validator/es/lib/isNumeric';
import isEmail from 'validator/es/lib/isEmail';
import PageHeader from '../../PageHeader';
import Error from '../../Error';

const EInvestment = (props) => {
    const {setIndex, login, InvestmentCreate, InvestmentUpdate, InvestmentGet, investment_id } = props;
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [info, setInfo] = useState({
        content: '',
        variant: ''
    });
    const [investment, setInvestment] = useState({ 
        name: '',
        type: '',
        about: '',
        url: '',
        phone: '',
        email: '',
        country: [],
        phoneCode: [],
        created_by: login.user_id,
        investment_id
    });
    
    useEffect(() => {
        if (isEmpty(investment_id) === false) {
            setLoading(true);
            props.getInvestmentRequest({
                investment_id
            });
        }
    }, []);

    const handlePhoneCode = (valueMixed) => {
        const object = {...investment};
        object.phoneCode = valueMixed.length ? [valueMixed[0].dial_code]: [];
        setInvestment(object); 
    };
    const handleChange = (e) => {
        const {name, value} = e.target;
        const object = {...investment};
        object[name] = value;
        setInvestment(object);
    };

    const handleCountry = (valueMixed) => {
        const object = {...investment};
        object.country = valueMixed.length ? [valueMixed[0].code]: [];
        setInvestment(object); 
    };

    const handleSubmit = () => {
        if (isEmpty(investment.name) === true) {
            setInfo({
                ...info,
                  content: 'Please specify Name',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        if (isEmpty(investment.type) === true) {
            setInfo({
                ...info,
                  content: 'Please Choose the Investment Type',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        if (isEmpty(investment.about) === true) {
            setInfo({
                ...info,
                  content: 'Please Describe your Investment in 50 words',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        if (isEmpty(investment.url) === true) {
            setInfo({
                ...info,
                  content: 'Please Give me Investment Website URL',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        if (isEmpty(investment.country) === true) {
            setInfo({
                ...info,
                  content: 'Please Select the Country',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        if (isEmail(investment.email) === false) {
            setInfo({
                ...info,
                  content: 'Invalid Email',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
       }
        if (isEmpty(investment.phoneCode) === true) {
            setInfo({
                ...info,
                content: 'Invalid Phone Code. Please Choose from the List',
                variant: 'warning'
            });
            setShowError(true);
            return;  
       }
       if (isNumeric(investment.phone) === false) {
        setInfo({
            ...info,
              content: 'Invalid Phone Number. Please Give only Numbers',
              variant: 'warning'
        });
        setShowError(true);
        return;  
       }
       setLoading(true);
       const data = {...investment};
       data.country = data.country[0];
       data.phoneCode = data.phoneCode[0];
       if (isUndefined(investment_id) === false) {
        props.updateInvestmentRequest(data);
       } else {
        props.insertInvestmentRequest(data);
       }
    }
    
    useEffect(() => {
        const {success, code, message, investment} = InvestmentCreate;
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
    }, [InvestmentCreate]);

    useEffect(() => {
        const {success, code, message, investment} = InvestmentUpdate;
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
    }, [InvestmentUpdate]);

    useEffect(() => {
        const { investment, success, message } = InvestmentGet;
        if(isUndefined(success)) {
            return false;
        }
        if(isUndefined(investment && investment.name) === false) {
            const object = {...investment};
            object.country = [object.country];
            object.phoneCode = [object.phoneCode || ''];
            setInvestment(object);
            setLoading(false);
        }
    }, [InvestmentGet]);

    if(activeIndex === 2) {
        return (
            <Confirmation title={'Investment Registered'} type={'Investment'} />
        )
    };
    if(activeIndex === 0) {
        return (
            <React.Fragment>
            <PageHeader title={`${!!(investment_id) === true ? 'Update Investment' : 'Register Investment'}`} show={loading} className={'mb-4'}/>
            {showError && <Error content={info.content} variant={info.variant} setShowError={setShowError} />}
            <Card border={'light'} className={'border-0'}>
                <Form.Group className={'mb-3 border ew-border-gradient'}>
                    <InputGroup>
                    <InputGroup.Text className={'bg-white border-0'}><CgRename /></InputGroup.Text>
                    <Form.Control  size={'lg'} 
                        className={'border-0'} required
                        placeholder={'Name'} 
                        defaultValue={investment.name} 
                        name={'name'} 
                        onChange={(event) => handleChange(event)}/> 
                    </InputGroup>
                </Form.Group>
                <Form.Group className={'mb-3 border ew-border-gradient'}>
                    <InputGroup>
                    <InputGroup.Text className={'bg-white border-0'}><CgShortcut /></InputGroup.Text>
                    <Form.Check 
                    size={'lg'}
                    onChange={(event) => handleChange(event)}
                    className={'border-0 m-2 mt-3'}
                    checked={investment.type === 'ANGEL_INVESTOR'}
                    inline label={"ANGEL_INVESTOR"} name={"type"} type={'radio'} value={"ANGEL_INVESTOR"} />
                    <Form.Check 
                    size={'lg'}
                    checked={investment.type === 'COMPANY'}
                    onChange={(event) => handleChange(event)}
                    className={'border-0 m-2 mt-3'}
                    inline label={"COMPANY"} name={"type"} type={'radio'} value={"COMPANY"} />
                    </InputGroup>
                </Form.Group>
                <Form.Group className={'mb-3 border ew-border-gradient'}>
                    <InputGroup>
                    <InputGroup.Text className={'bg-white border-0'}><TbGenderEpicene /></InputGroup.Text>
                    <Form.Control  size={'lg'} 
                        as="textarea" rows={3}
                        className={'border-0'} required
                        placeholder={'About'} 
                        defaultValue={investment.about} 
                        name={'about'} 
                        onChange={(event) => handleChange(event)}/> 
                    </InputGroup>
                </Form.Group>
                <Form.Group className={'mb-3 border ew-border-gradient'}>
                    <InputGroup>
                    <InputGroup.Text className={'bg-white border-0'}><TbAddressBook /></InputGroup.Text>
                    <Form.Control
                        className={'border-0'} required 
                        placeholder={'Website URL'} 
                        defaultValue={investment.url} 
                        name={'url'} 
                        onChange={(event) => handleChange(event)}/> 
                    </InputGroup>
                </Form.Group>
                <Form.Group className={'mb-3 border ew-border-gradient'}>
                    <InputGroup>
                    <InputGroup.Text className={'bg-white border-0'}><HiOutlineMail/></InputGroup.Text>
                    <Form.Control  size={'lg'} 
                        className={'border-0'} required
                        placeholder={'Email'} 
                        defaultValue={investment.email} 
                        name={'email'} 
                        onChange={(event) => handleChange(event)}/> 
                    </InputGroup>
                </Form.Group>
                <Form.Group className={'mb-3 border ew-border-gradient'}>
                    <InputGroup>
                    <InputGroup.Text className={'bg-white border-0'}><FcPhone /></InputGroup.Text>
                    <Typeahead
                        multiple={false}
                        id='ew-phone-code'
                        style={{width: '20%'}}
                        className={'border-0'}
                        labelKey="dial_code"
                        onChange={(value) => handlePhoneCode(value)}
                        options={PhoneCodeJson}
                        placeholder="Code"
                        selected={investment.phoneCode}
                    />
                    <Form.Control  size={'lg'} 
                        className={'border-0'} required
                        placeholder={'Phone'} 
                        defaultValue={investment.phone} 
                        name={'phone'} 
                        onChange={(event) => handleChange(event)}/> 
                    </InputGroup>
                </Form.Group>
                <Form.Group className={'mb-3 border ew-border-gradient'}>
                    <InputGroup>
                    <InputGroup.Text className={'bg-white border-0'}><FcPhone /></InputGroup.Text>
                    <Typeahead
                        multiple={false}
                        id='ew-country-code'
                        className={'border-0'}
                        labelKey="code"
                        onChange={(value) => handleCountry(value)}
                        options={PhoneCodeJson}
                        placeholder="Country Code"
                        selected={investment.country}
                    /> 
                    </InputGroup>
                </Form.Group>
                <Form.Group className={'mt-2'}>
                    <Row>
                        <Col md={4}>
                        <Button className={'btn btn-primary'}
                            onClick={() => handleSubmit()}
                        >Next</Button>
                        </Col>
                    </Row>
                </Form.Group>
            </Card>
            </React.Fragment>
        )
    }
    if(activeIndex === 1) {
        return (
            <React.Fragment>
                <File buttonName={'Submit'} setActiveIndex={setActiveIndex} indexNumber={2} connect_id={InvestmentGet.investment_id} />
            </React.Fragment>
        )
    }   
}

const mapStateToProps = (state) => {
    return {
      login: state.login || {},
      InvestmentGet: state.investment.get || {},
      InvestmentCreate: state.investment.insert || {},
      InvestmentUpdate: state.investment.update || {}
    }
};
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getInvestmentRequest,
        updateInvestmentRequest,
        insertInvestmentRequest
    }, dispatch);
};
  
export default connect(mapStateToProps, mapDispatchToProps)(EInvestment);