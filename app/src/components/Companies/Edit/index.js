import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {Col, Row, InputGroup, Form, Button, Card, ListGroup, ListGroupItem} from 'react-bootstrap';
import { useNavigate} from 'react-router-dom';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Typeahead } from 'react-bootstrap-typeahead';
import PhoneCodeJson from '../../../data/PhoneCode/index.json';
import { insertCompaniesRequest, getCompaniesRequest, updateCompaniesRequest, initCompaniesRequest } from '../../../db/action/companies';
import { insertSharesRequest, companiesSharesRequest } from '../../../db/action/shares';
import File from '../../File';
import Categories from '../../Categories';
import Product from '../../Product';
import Domain from '../../Domain';
import Confirmation from '../../Confirmation';
import { HiOutlineMail } from 'react-icons/hi';
import { CgRename, CgShortcut, CgAdidas, CgAlignMiddle, CgArrowLeftR, CgNametag } from 'react-icons/cg';
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
const ECompanies = (props) => {
    const {setIndex, login, CompaniesCreate, CompaniesUpdate, CompaniesGet, SharesCreate, companies_id, SharesCompanies} = props;
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [info, setInfo] = useState({
        content: '',
        variant: ''
    });
    const [shares, setShares] = useState({
        companies_id,
        number_of_shares: '',
        base_price: '',
        created_by: login.user_id
    });
    const [companies, setCompanies] = useState({ 
        name: '',
        short_name: '',
        cin: '',
        about: '',
        url: '',
        video_url: '',
        phone: '',
        email: '',
        country: [],
        phoneCode: [],
        revenue_amount: '', 
        target_amount: '', 
        achieved_amount: '',
        stage:'Seed',
        created_by: login.user_id,
        companies_id
    });
    
    useEffect(() => {
        if (isEmpty(companies_id) === false) {
            setLoading(true);
            props.getCompaniesRequest({
                companies_id
            });
            props.companiesSharesRequest({
                companies_id
            });
        }
    }, []);

    const handlePhoneCode = (valueMixed) => {
        const object = {...companies};
        object.phoneCode = valueMixed.length ? [valueMixed[0].dial_code]: [];
        setCompanies(object); 
    };

    const handleSharesChange = (e) => {
        const {name, value} = e.target;
        const object = {...shares};
        object[name] = value;
        setShares(object);
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        const object = {...companies};
        object[name] = value;
        setCompanies(object);
    };

    const handleCountry = (valueMixed) => {
        const object = {...companies};
        object.country = valueMixed.length ? [valueMixed[0].code]: [];
        setCompanies(object); 
    };

    const handleCompaniesInfo = () => {
        if (isEmpty(companies.name) === true) {
            setInfo({
                ...info,
                  content: 'Please specify Company Name',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        if (isEmpty(companies.short_name) === true) {
            setInfo({
                ...info,
                  content: 'Please specify Short name of the Company',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        if (companies.short_name.length !== 4) {
            setInfo({
                ...info,
                  content: 'Short name must be 4 characters',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        if (isEmpty(companies.cin) === true) {
            setInfo({
                ...info,
                  content: 'Please specify Company ID',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        if (isEmpty(companies.about) === true) {
            setInfo({
                ...info,
                  content: 'Please Describe your company in 50 words',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        if (isEmpty(companies.url) === true) {
            setInfo({
                ...info,
                  content: 'Please Give me Companies Website URL',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        if (isEmpty(companies.video_url) === true) {
            setInfo({
                ...info,
                  content: 'Please give me Company Video URL',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        if (isEmpty(companies.country) === true) {
            setInfo({
                ...info,
                  content: 'Please Select the Country',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        if (isEmail(companies.email) === false) {
            setInfo({
                ...info,
                  content: 'Invalid Email',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
       }
        if (isEmpty(companies.phoneCode) === true) {
            setInfo({
                ...info,
                content: 'Invalid Phone Code. Please Choose from the List',
                variant: 'warning'
            });
            setShowError(true);
            return;  
       }
       if (isNumeric(companies.phone) === false) {
        setInfo({
            ...info,
              content: 'Invalid Phone Number. Please Give only Numbers',
              variant: 'warning'
        });
        setShowError(true);
        return;  
       }
       setActiveIndex(1);
       return;
    }
    
    const handleSubmit = () => {
        if (isEmpty(companies.stage) === true) {
            setInfo({
                ...info,
                  content: 'Please specify Your Investment Stage',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        if (Number(companies.target_amount) <= 0) {
            setInfo({
                ...info,
                  content: 'Please specify Expected Target Amount',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }

       setLoading(true);
       const data = {...companies};
       data.revenue_amount = Number(data.revenue_amount);
       data.achieved_amount = Number(data.achieved_amount);
       data.target_amount = Number(data.target_amount);
       data.country = data.country[0];
       data.phoneCode = data.phoneCode[0];
       if (isUndefined(companies_id) === false) {
        props.updateCompaniesRequest(data);
       } else {
        props.insertCompaniesRequest(data);
       }
    }
    
    const handleSharesSubmit = () => {
        if (isEmpty(shares.companies_id) === true) {
            setInfo({
                ...info,
                  content: 'Company Information not found.',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        if (isNumeric(shares.number_of_shares.toString()) === false) {
        setInfo({
            ...info,
              content: 'Invalid Shares Count.Please Give only Numbers',
              variant: 'warning'
        });
        setShowError(true);
        return;  
       }
       if (isNumeric(shares.base_price.toString()) === false) {
        setInfo({
            ...info,
              content: 'Invalid Shares Price.Please Give only Numbers',
              variant: 'warning'
        });
        setShowError(true);
        return;  
       }
       setLoading(true);
       props.insertSharesRequest(shares);
    }
    
    useEffect(() => {
        const {success, code, message, company} = CompaniesCreate;
        if(isUndefined(success)) {
            return false;
        }
        if(success === true) { 
            const object = {...shares};
            object.companies_id = company.companies_id;
            setLoading(false);
            setShares(object);
            setActiveIndex(2);
        } else {
            setInfo({
                ...info,
                    content: `${code} - ${message}`,
                    variant: 'warning'
            });
            setShowError(true);
            setLoading(false);
        } 
    }, [CompaniesCreate]);

    useEffect(() => {
        const {success, code, message, companies} = CompaniesUpdate;
        if(isUndefined(success)) {
            return false;
        }
        if(success === true) {  
            const object = {...shares};
            object.companies_id = companies.companies_id;
            setLoading(false);
            setShares(object);
            setActiveIndex(2);
        } else {
            setInfo({
                ...info,
                    content: `${code} - ${message}`,
                    variant: 'warning'
            });
            setShowError(true);
            setLoading(false);
        } 
    }, [CompaniesUpdate]);

    useEffect(() => {
        const {success, code, message} = SharesCreate;
        if(isUndefined(success)) {
            return false;
        }
        if(success === true) {
            props.initCompaniesRequest({});
            setLoading(false); 
            setActiveIndex(6); 
        } else {
            setInfo({
                ...info,
                    content: `${code} - ${message}`,
                    variant: 'warning'
            });
            setShowError(true);
            setLoading(false);
        } 
    }, [SharesCreate]);

    useEffect(() => {
        const { company, success, message } = CompaniesGet;
        if(isUndefined(success)) {
            return false;
        }
        if(isUndefined(company && company.name) === false) {
            const object = {...company};
            object.country = [object.country];
            object.phoneCode = [object.phoneCode || ''];
            setIsDone(false);
            setCompanies(object);
            setLoading(false);
        }
    }, [CompaniesGet]);

    useEffect(() => {
        const { share, success, message } = SharesCompanies;
        if(isUndefined(success)) {
            return false;
        }
        if(isUndefined(share) === false) {
            const object = {...share};
            setShares(object);
            setLoading(false);
        }
    }, [SharesCompanies]);

    if(isDone === true) {
        return (
            <Confirmation title={'Company Registered'} type={'Companies'} />
        )
    };

    // basic 1
    if(activeIndex === 0) {
        return (
            <React.Fragment>
            <PageHeader title={`${!!(companies_id) === true ? 'Update Company' : 'Register Company'}`} show={loading} className={'mb-4'}/>
            {showError && <Error content={info.content} variant={info.variant} setShowError={setShowError} />}
            <Card border={'light'} className={'border-0'}>
                <Form.Group className={'mb-3 border ew-border-gradient'}>
                    <InputGroup>
                    <InputGroup.Text className={'bg-white border-0'}><CgRename /></InputGroup.Text>
                    <Form.Control  size={'lg'} 
                        className={'border-0'} required
                        placeholder={'Name'} 
                        defaultValue={companies.name} 
                        name={'name'} 
                        onChange={(event) => handleChange(event)}/> 
                    </InputGroup>
                </Form.Group>
                <Form.Group className={'mb-3 border ew-border-gradient'}>
                    <InputGroup>
                    <InputGroup.Text className={'bg-white border-0'}><CgShortcut /></InputGroup.Text>
                    <Form.Control  size={'lg'} 
                        className={'border-0'} required
                        maxLength={4}
                        placeholder={'Short Name'} 
                        defaultValue={companies.short_name} 
                        name={'short_name'} 
                        onChange={(event) => handleChange(event)}/> 
                    </InputGroup>
                </Form.Group>
                <Form.Group className={'mb-3 border ew-border-gradient'}>
                    <InputGroup>
                    <InputGroup.Text className={'bg-white border-0'}><CgNametag /></InputGroup.Text>
                    <Form.Control  size={'lg'} 
                        className={'border-0'} required
                        maxLength={20}
                        placeholder={'Company ID'} 
                        defaultValue={companies.cin} 
                        name={'cin'} 
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
                        defaultValue={companies.about} 
                        name={'about'} 
                        onChange={(event) => handleChange(event)}/> 
                    </InputGroup>
                </Form.Group>
                <Form.Group className={'mb-3 border ew-border-gradient'}>
                    <InputGroup>
                    <InputGroup.Text className={'bg-white border-0'}><FcLink /></InputGroup.Text>
                    <Form.Control
                        className={'border-0'} required 
                        placeholder={'Company website URL'} 
                        defaultValue={companies.url} 
                        name={'url'} 
                        onChange={(event) => handleChange(event)}/> 
                    </InputGroup>
                </Form.Group>
                <Form.Group className={'mb-3 border ew-border-gradient'}>
                    <InputGroup>
                    <InputGroup.Text className={'bg-white border-0'}><TbAddressBook /></InputGroup.Text>
                    <Form.Control  size={'lg'} 
                        className={'border-0'} required
                        placeholder={'Video URL'} 
                        defaultValue={companies.video_url} 
                        name={'video_url'} 
                        onChange={(event) => handleChange(event)}/> 
                    </InputGroup>
                </Form.Group>
                <Form.Group className={'mb-3 border ew-border-gradient'}>
                    <InputGroup>
                    <InputGroup.Text className={'bg-white border-0'}><HiOutlineMail/></InputGroup.Text>
                    <Form.Control  size={'lg'} 
                        className={'border-0'} required
                        placeholder={'Email'} 
                        defaultValue={companies.email} 
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
                        selected={companies.phoneCode}
                    />
                    <Form.Control  size={'lg'} 
                        className={'border-0'} required
                        placeholder={'Phone'} 
                        defaultValue={companies.phone} 
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
                        selected={companies.country}
                    /> 
                    </InputGroup>
                </Form.Group>
                <Form.Group className={'mt-2'}>
                    <Row>
                        <Col md={4}>
                        <Button className={'btn btn-primary'}
                            onClick={() => handleCompaniesInfo()}
                        >Next</Button>
                        </Col>
                    </Row>
                </Form.Group>
            </Card>
            </React.Fragment>
        )
    } 

    // basic 2
    if(activeIndex === 1) {
        return (
            <React.Fragment>
            <PageHeader title={`${!!(companies_id) === true ? 'Update Company - Finance' : 'Register Company - Finance'}`} show={loading} className={'mb-4'}/>
            {showError && <Error content={info.content} variant={info.variant} setShowError={setShowError} />}
            <Card border={'light'} className={'border-0'}>
                <Form.Group className={'mb-3 border ew-border-gradient'}>
                    <InputGroup>
                    <InputGroup.Text className={'bg-white border-0'}><CgRename /></InputGroup.Text>
                    <InputGroup.Text className={'bg-white border-0'}>Investment Stage</InputGroup.Text>
                    <Form.Select 
                        size={'lg'}
                        className={'border-0'} required
                        placeholder={'Investment Stage'} 
                        defaultValue={companies.stage} 
                        name={'stage'} 
                        onChange={(event) => handleChange(event)} >
                        { stages.map(item => <option value={item}>{item}</option>) }
                    </Form.Select>
                    </InputGroup>
                </Form.Group>
                <Form.Group className={'mb-3 border ew-border-gradient'}>
                    <InputGroup>
                    <InputGroup.Text className={'bg-white border-0'}><CgAdidas /></InputGroup.Text>
                    <Form.Control  size={'lg'} 
                        className={'border-0'} required
                        placeholder={'Revenue per Month (in Dots)'} 
                        defaultValue={companies.revenue_amount} 
                        name={'revenue_amount'} 
                        onChange={(event) => handleChange(event)}/> 
                    </InputGroup>
                </Form.Group>
                <Form.Group className={'mb-3 border ew-border-gradient'}>
                    <InputGroup>
                    <InputGroup.Text className={'bg-white border-0'}><CgAlignMiddle /></InputGroup.Text>
                    <Form.Control  size={'lg'} 
                        className={'border-0'} required
                        placeholder={'Target Amount (in Dots)'} 
                        defaultValue={companies.target_amount} 
                        name={'target_amount'} 
                        onChange={(event) => handleChange(event)}/> 
                    </InputGroup>
                </Form.Group>
                <Form.Group className={'mb-3 border ew-border-gradient'}>
                    <InputGroup>
                    <InputGroup.Text className={'bg-white border-0'}><CgArrowLeftR /></InputGroup.Text>
                    <Form.Control  size={'lg'} 
                        className={'border-0'} required
                        placeholder={'Achieved Amount (in Dots)'} 
                        defaultValue={companies.achieved_amount} 
                        name={'achieved_amount'} 
                        onChange={(event) => handleChange(event)}/> 
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
    // categories
    if(activeIndex === 2) {
        return (
            <React.Fragment>
                <Categories 
                    buttonName={'Next'} 
                    setActiveIndex={setActiveIndex} 
                    indexNumber={3} connect_id={shares.companies_id} />
            </React.Fragment>
        )
    }

    // product
    if(activeIndex === 3) {
        return (
            <React.Fragment>
                <Product 
                buttonName={'Next'} 
                setActiveIndex={setActiveIndex} 
                indexNumber={4} 
                connect_id={shares.companies_id} />
            </React.Fragment>
        )
    }

    // file
    if(activeIndex === 4) {
        return (
            <React.Fragment>
                <File 
                    buttonName={'Next'} 
                    setActiveIndex={setActiveIndex} 
                    indexNumber={5} 
                    connect_id={shares.companies_id} />
            </React.Fragment>
        )
    }

    // shares
    if(activeIndex === 5) {
        return (
            <React.Fragment>
            <PageHeader title={`${!!shares.companies_id === true ? 'Update Share Information' : 'Register Company Share Information'}`} show={loading} className={'mb-4'}/>
            {showError && <Error content={info.content} variant={info.variant} setShowError={setShowError} />}
            <Card border={'light'} className={'border-0'}>
                <Form.Group className={'mb-3 border ew-border-gradient'}>
                    <InputGroup>
                    <InputGroup.Text className={'bg-white border-0'}><CgRename /></InputGroup.Text>
                    <Form.Control  size={'lg'} 
                        className={'border-0'} required
                        placeholder={'Number of Shares'} 
                        defaultValue={shares.number_of_shares} 
                        name={'number_of_shares'} 
                        onChange={(event) => handleSharesChange(event)}/> 
                    </InputGroup>
                </Form.Group>
                <Form.Group className={'mb-3 border ew-border-gradient'}>
                    <InputGroup>
                    <InputGroup.Text className={'bg-white border-0'}><CgShortcut /></InputGroup.Text>
                    <Form.Control  size={'lg'} 
                        className={'border-0'} required
                        maxLength={15}
                        placeholder={'Price (Dots) per Share'} 
                        defaultValue={shares.base_price} 
                        name={'base_price'} 
                        onChange={(event) => handleSharesChange(event)}/> 
                    <InputGroup.Text className={'bg-white border-0'}><TbCircleDot /></InputGroup.Text>
                    </InputGroup>
                </Form.Group>
                <Form.Group className={'mt-2'}>
                    <Row>
                        <Col md={4}>
                        <Button className={'btn btn-primary'}
                            onClick={() => handleSharesSubmit()}
                        >Next</Button>
                        </Col>
                    </Row>
                </Form.Group>
            </Card>
            </React.Fragment>
        )
    }
    
    // domain
    if(activeIndex === 6) {
        return (
            <React.Fragment>
                <Domain 
                type={'companies'}
                buttonName={'Submit'} 
                setIsDone={setIsDone}  
                type_id={shares.companies_id} />
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      login: state.login || {},
      SharesCompanies: state.shares.company || {},
      SharesCreate: state.shares.insert || {},
      CompaniesGet: state.companies.get || {},
      CompaniesCreate: state.companies.insert || {},
      CompaniesUpdate: state.companies.update || {}
    }
};
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        companiesSharesRequest,
        getCompaniesRequest,
        updateCompaniesRequest,
        insertCompaniesRequest,
        insertSharesRequest,
        initCompaniesRequest
    }, dispatch);
};
  
export default connect(mapStateToProps, mapDispatchToProps)(ECompanies);