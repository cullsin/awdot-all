import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {Col, Row, InputGroup, Form, Button, Card, ListGroup, ListGroupItem} from 'react-bootstrap';
import { useNavigate} from 'react-router-dom';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Typeahead } from 'react-bootstrap-typeahead';
import PhoneCodeJson from '../../../data/PhoneCode/index.json';
import { insertPartnersRequest, getPartnersRequest, updatePartnersRequest, initPartnersRequest } from '../../../db/action/partners';
import File from '../../File';
import Interest from '../../Interest';
import Clients from '../../Clients';
import Domain from '../../Domain';
import Confirmation from '../../Confirmation';
import { HiOutlineMail } from 'react-icons/hi';
import { CgRename, CgShortcut, CgAdidas, CgAlignMiddle, CgArrowLeftR } from 'react-icons/cg';
import { TbAddressBook, TbAbacus } from 'react-icons/tb';
import { TbCircleDot } from 'react-icons/tb';
import { FcPhone, FcGlobe, FcLink } from 'react-icons/fc';
import {TbGenderEpicene} from 'react-icons/tb';
import {isUndefined, isEmpty } from 'lodash';
import isNumeric from 'validator/es/lib/isNumeric';
import isAlphanumeric from 'validator/es/lib/isAlphanumeric';
import isEmail from 'validator/es/lib/isEmail';
import PageHeader from '../../PageHeader';
import Error from '../../Error';

const stages = [
    'Pre-Seed',
    'Seed',
    'Series - A',
    'Series - B',
    'Series - C',
    'Series - D'
];
const EPartners = (props) => {
    const {setIndex, login, PartnersCreate, PartnersUpdate, PartnersGet, partners_id} = props;
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [info, setInfo] = useState({
        content: '',
        variant: ''
    });
    const [partners, setPartners] = useState({ 
        name: '',
        about: '',
        url: '',
        phone: '',
        email: '',
        country: [],
        phoneCode: [],
        created_by: login.user_id,
        partners_id
    });
    
    useEffect(() => {
        if (isEmpty(partners_id) === false) {
            setLoading(true);
            props.getPartnersRequest({
                partners_id
            });
        }
    }, []);

    const handlePhoneCode = (valueMixed) => {
        const object = {...partners};
        object.phoneCode = valueMixed.length ? [valueMixed[0].dial_code]: [];
        setPartners(object); 
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        const object = {...partners};
        object[name] = value;
        setPartners(object);
    };

    const handleCountry = (valueMixed) => {
        const object = {...partners};
        object.country = valueMixed.length ? [valueMixed[0].code]: [];
        setPartners(object); 
    };

    const handlePartnersInfo = () => {
        if (isEmpty(partners.name) === true) {
            setInfo({
                ...info,
                  content: 'Please specify Partners Name',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        if (isEmpty(partners.about) === true) {
            setInfo({
                ...info,
                  content: 'Please Describe your partner in 50 words',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        if (isEmpty(partners.url) === true) {
            setInfo({
                ...info,
                  content: 'Please Give me Partners Website URL',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        if (isEmpty(partners.country) === true) {
            setInfo({
                ...info,
                  content: 'Please Select the Country',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        if (isEmail(partners.email) === false) {
            setInfo({
                ...info,
                  content: 'Invalid Email',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
       }
        if (isEmpty(partners.phoneCode) === true) {
            setInfo({
                ...info,
                content: 'Invalid Phone Code. Please Choose from the List',
                variant: 'warning'
            });
            setShowError(true);
            return;  
       }
       if (isNumeric(partners.phone) === false) {
        setInfo({
            ...info,
              content: 'Invalid Phone Number. Please Give only Numbers',
              variant: 'warning'
        });
        setShowError(true);
        return;  
       }
       handleSubmit();
       return;
    }
    
    const handleSubmit = () => {
       setLoading(true);
       const data = {...partners};
       data.country = data.country[0];
       data.phoneCode = data.phoneCode[0];
       if (isUndefined(partners_id) === false) {
        props.updatePartnersRequest(data);
       } else {
        props.insertPartnersRequest(data);
       }
    }
    
    useEffect(() => {
        const {success, code, message, partner} = PartnersCreate;
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
    }, [PartnersCreate]);

    useEffect(() => {
        const {success, code, message, partner} = PartnersUpdate;
        if(isUndefined(success)) {
            return false;
        }
        if(success === true) { 
            setActiveIndex(1); 
        } else {
            setInfo({
                ...info,
                    content: `${code} - ${message}`,
                    variant: 'warning'
            });
            setShowError(true);
            setLoading(false);
        } 
    }, [PartnersUpdate]);

    useEffect(() => {
        const { partner, success, message } = PartnersGet;
        if(isUndefined(success)) {
            return false;
        }
        if(isUndefined(partner && partner.name) === false) {
            const object = {...partner};
            object.country = [object.country];
            object.phoneCode = [object.phoneCode || ''];
            setIsDone(false);
            setPartners(object);
            setLoading(false);
        }
    }, [PartnersGet]);

    if(isDone === true) {
        return (
            <Confirmation title={'Partners Registered'} type={'Partners'} />
        )
    };

    if(activeIndex === 0) {
        return (
            <React.Fragment>
            <PageHeader title={`${!!(partners_id) === true ? 'Update Partners' : 'Register Partners'}`} show={loading} className={'mb-4'}/>
            {showError && <Error content={info.content} variant={info.variant} setShowError={setShowError} />}
            <Card border={'light'} className={'border-0'}>
                <Form.Group className={'mb-3 border ew-border-gradient'}>
                    <InputGroup>
                    <InputGroup.Text className={'bg-white border-0'}><CgRename /></InputGroup.Text>
                    <Form.Control  size={'lg'} 
                        className={'border-0'} required
                        placeholder={'Name'} 
                        defaultValue={partners.name} 
                        name={'name'} 
                        onChange={(event) => handleChange(event)}/> 
                    </InputGroup>
                </Form.Group>
                <Form.Group className={'mb-3 border ew-border-gradient'}>
                    <InputGroup>
                    <InputGroup.Text className={'bg-white border-0'}><TbGenderEpicene /></InputGroup.Text>
                    <Form.Control  size={'lg'} 
                        as="textarea" rows={3}
                        className={'border-0'} required
                        placeholder={'About'} 
                        defaultValue={partners.about} 
                        name={'about'} 
                        onChange={(event) => handleChange(event)}/> 
                    </InputGroup>
                </Form.Group>
                <Form.Group className={'mb-3 border ew-border-gradient'}>
                    <InputGroup>
                    <InputGroup.Text className={'bg-white border-0'}><FcLink /></InputGroup.Text>
                    <Form.Control
                        className={'border-0'} required 
                        placeholder={'Partners website URL'} 
                        defaultValue={partners.url} 
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
                        defaultValue={partners.email} 
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
                        selected={partners.phoneCode}
                    />
                    <Form.Control  size={'lg'} 
                        className={'border-0'} required
                        placeholder={'Phone'} 
                        defaultValue={partners.phone} 
                        name={'phone'} 
                        onChange={(event) => handleChange(event)}/> 
                    </InputGroup>
                </Form.Group>
                <Form.Group className={'mb-3 border ew-border-gradient'}>
                    <InputGroup>
                    <InputGroup.Text className={'bg-white border-0'}><FcGlobe /></InputGroup.Text>
                    <Typeahead
                        multiple={false}
                        id='ew-country-code'
                        className={'border-0'}
                        labelKey="code"
                        onChange={(value) => handleCountry(value)}
                        options={PhoneCodeJson}
                        placeholder="Country Code"
                        selected={partners.country}
                    /> 
                    </InputGroup>
                </Form.Group>
                <Form.Group className={'mt-2'}>
                    <Row>
                        <Col md={4}>
                        <Button className={'btn btn-primary'}
                            onClick={() => handlePartnersInfo()}
                        >Next</Button>
                        </Col>
                    </Row>
                </Form.Group>
            </Card>
            </React.Fragment>
        )
    } 

    // interest
    if(activeIndex === 1) {
        const localP = PartnersCreate.partners || PartnersGet.partners || PartnersUpdate.partners;  
        return (
            <React.Fragment>
                <Interest 
                    buttonName={'Next'} 
                    setActiveIndex={setActiveIndex} 
                    indexNumber={2} connect_id={localP.partners_id} />
            </React.Fragment>
        )
    }

    // product
    if(activeIndex === 2) {
        const localP = PartnersCreate.partners || PartnersGet.partners || PartnersUpdate.partners;  
        return (
            <React.Fragment>
                <Clients
                buttonName={'Next'} 
                setActiveIndex={setActiveIndex} 
                indexNumber={3} 
                connect_id={localP.partners_id} />
            </React.Fragment>
        )
    }

    // file
    if(activeIndex === 3) {
        const localP = PartnersCreate.partners || PartnersGet.partners || PartnersUpdate.partners;  
        return (
            <React.Fragment>
                <File 
                    buttonName={'Next'} 
                    setActiveIndex={setActiveIndex} 
                    indexNumber={4} 
                    connect_id={localP.partners_id} />
            </React.Fragment>
        )
    }

    // domain
    if(activeIndex === 4) {
        const localP = PartnersCreate.partners || PartnersGet.partners || PartnersUpdate.partners;  
        return (
            <React.Fragment>
                <Domain 
                type={'partners'}
                buttonName={'Submit'} 
                setIsDone={setIsDone}  
                type_id={localP.partners_id} />
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      login: state.login || {},
      PartnersGet: state.partners.get || {},
      PartnersCreate: state.partners.insert || {},
      PartnersUpdate: state.partners.update || {}
    }
};
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getPartnersRequest,
        updatePartnersRequest,
        insertPartnersRequest,
        initPartnersRequest
    }, dispatch);
};
  
export default connect(mapStateToProps, mapDispatchToProps)(EPartners);