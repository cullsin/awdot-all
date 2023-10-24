import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {Col, Row, InputGroup, Form, Button, Card, ListGroup, ListGroupItem} from 'react-bootstrap';
import { useNavigate} from 'react-router-dom';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Typeahead } from 'react-bootstrap-typeahead';
import PhoneCodeJson from '../../data/PhoneCode/index.json';
import { createProfileRequest, updateProfileRequest, userProfileRequest } from '../../db/action/profile';
import Confirmation from '../Confirmation';
import { BiIdCard } from 'react-icons/bi';
import { BsCalendar3, BsCardList, BsKey } from 'react-icons/bs';
import { TbAddressBook } from 'react-icons/tb';
import { FaCity } from 'react-icons/fa';
import { FcPhone } from 'react-icons/fc';
import {HiOutlineGlobe} from 'react-icons/hi';
import {BsFillSignpostFill} from 'react-icons/bs';
import {TbGenderEpicene} from 'react-icons/tb';
import {isUndefined, isEmpty, isNaN } from 'lodash'
import PageHeader from '../PageHeader';
import Error from '../Error';

const Profile = (props) => {
    const {profileCreate, setActiveIndex, profileGet, menu} = props;
    const navigate = useNavigate();
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [init, setInit] = useState(true);
    const [info, setInfo] = useState({
        content: '',
        variant: ''
    });
    const [user, setUser] = useState({
        dateOfBirth:'',
        gov_id: '',
        last_4: '',
        line1:'',
        line2:'',
        city:'',
        state:'',
        gender:'',
        country:[],
        postal_code: '',
        web3_wallet: '',
        wallet_key: ''
    });
    
    useEffect(() => {
        setLoading(true);
        props.userProfileRequest();
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        const object = {...user};
        object[name] = value;
        if(name === 'gov_id') {
            object.last_4 = value.substring(value.length - 4); 
        }
        setUser(object);
    };

    const handleCountry = (valueMixed) => {
        const object = {...user};
        object.country = valueMixed.length ? [valueMixed[0].code]: [];
        setUser(object); 
    };

    const handleSubmit = () => {
        if (isEmpty(user.dateOfBirth) === true) {
            setInfo({
                ...info,
                  content: 'Please specify your Date of Birth',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        if (isEmpty(user.gender) === true) {
            setInfo({
                ...info,
                  content: 'Please specify your Gender',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        if (user.gender.toLowerCase() !== 'male' && user.gender.toLowerCase() !== 'female' ) {
            setInfo({
                ...info,
                  content: 'Please specify Gender either male or female',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        if (isEmpty(user.gov_id) === true) {
            setInfo({
                ...info,
                  content: 'Please specify Any Government ID Proof',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        const last_4 = Number(user.gov_id.substr(user.gov_id.length - 4));
        if (isNaN(last_4) === true) {
            setInfo({
                ...info,
                  content: 'Last 4 digit of an ID Must be a Digit',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        if (isEmpty(user.gov_id) === true) {
            setInfo({
                ...info,
                  content: 'Please specify Any Government ID Proof',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        if (moment(user.dateOfBirth, 'YYYY-MM-DD', true).isValid() === false) {
            setInfo({
                ...info,
                  content: 'Invalid Date. Please follow Date Format YYYY-MM-DD',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        if (isEmpty(user.line1) === true) {
            setInfo({
                ...info,
                  content: 'Please specify Address Line 1',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        if (isEmpty(user.line2) === true) {
            setInfo({
                ...info,
                  content: 'Please specify Address Line 2',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        if (isEmpty(user.city) === true) {
            setInfo({
                ...info,
                  content: 'Please specify the City',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        if (isEmpty(user.state) === true) {
            setInfo({
                ...info,
                  content: 'Please specify the State',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        if (isEmpty(user.country) === true) {
            setInfo({
                ...info,
                  content: 'Please Select the Country',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        if (isEmpty(user.postal_code) === true) {
            setInfo({
                ...info,
                content: 'Invalid Postal Code',
                variant: 'warning'
            });
            setShowError(true);
            return;  
       }
       if (isEmpty(user.web3_wallet) === true) {
        setInfo({
            ...info,
            content: 'Invalid Wallet address',
            variant: 'warning'
        });
        setShowError(true);
        return;  
       }
       if (isEmpty(user.wallet_key) === true) {
        setInfo({
            ...info,
            content: 'Invalid Wallet private key',
            variant: 'warning'
        });
        setShowError(true);
        return;  
       }
       setLoading(true);
       const data = {...user};
       data.country = data.country[0];
       setInit(false);
       if(data.profile_id) {
         props.updateProfileRequest(data);
       } else {
         props.createProfileRequest(data);
       }
    }
    
    useEffect(() => {
        const {success, code, message} = profileCreate;
        if(isUndefined(success) && init === true) {
            return false;
        }
        if(success === true) { 
            setInit(true);
            if(menu === false) {
                setActiveIndex(3);
            } else {
                setIsDone(true);
            }
            setInfo({
                ...info,
                    content: `${code} - ${message}`,
                    variant: 'success'
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
    }, [profileCreate]);

    useEffect(() => {
        if(isUndefined(profileGet.dateOfBirth) === false) {
            const object = {...profileGet};
            object.country = [object.country];
            object.dateOfBirth = moment(object.dateOfBirth).format('YYYY-MM-DD');
            setUser(object);
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, [profileGet]);

    if(isDone === true && menu === false) {
        return (
            <Confirmation title={'Profile Confirmation'} type={'Profile'} />
        )
    };
    return (
        <React.Fragment>
        <PageHeader title={`${menu === false ? 'Step 3 - Update Profile' : 'Profile'}`} show={loading} className={'mb-4'}/>
        {showError && <Error content={info.content} variant={info.variant} setShowError={setShowError} />}
        <Card border={'light'} className={'border-0'}>
            <Form.Group className={'mb-3 border ew-border-gradient'}>
                <InputGroup>
                <InputGroup.Text className={'bg-white border-0'}><BsCalendar3 /></InputGroup.Text>
                <Form.Control  size={'lg'} 
                    className={'border-0'} required
                    placeholder={'Date of Birth YYYY-MM-DD'} 
                    defaultValue={user.dateOfBirth} 
                    name={'dateOfBirth'} 
                    onChange={(event) => handleChange(event)}/> 
                </InputGroup>
            </Form.Group>
            <Form.Group className={'mb-3 border ew-border-gradient'}>
                <InputGroup>
                <InputGroup.Text className={'bg-white border-0'}><BiIdCard /></InputGroup.Text>
                <Form.Control  size={'lg'} 
                    className={'border-0'} required
                    placeholder={'Government ID - SSN or Aadhar or Any'} 
                    defaultValue={user.gov_id} 
                    name={'gov_id'} 
                    onChange={(event) => handleChange(event)}/> 
                </InputGroup>
            </Form.Group>
            <Form.Group className={'mb-3 border ew-border-gradient'}>
                <InputGroup>
                <InputGroup.Text className={'bg-white border-0'}><TbGenderEpicene /></InputGroup.Text>
                <Form.Control  size={'lg'} 
                    className={'border-0'} required
                    placeholder={'Gender'} 
                    defaultValue={user.gender} 
                    name={'gender'} 
                    onChange={(event) => handleChange(event)}/> 
                </InputGroup>
            </Form.Group>
            <Form.Group className={'mb-3 border ew-border-gradient'}>
                <InputGroup>
                <InputGroup.Text className={'bg-white border-0'}><TbAddressBook /></InputGroup.Text>
                <Form.Control
                    className={'border-0'} required 
                    placeholder={'Address Line 1'} 
                    defaultValue={user.line1} 
                    name={'line1'} 
                    onChange={(event) => handleChange(event)}/> 
                </InputGroup>
            </Form.Group>
            <Form.Group className={'mb-3 border ew-border-gradient'}>
                <InputGroup>
                <InputGroup.Text className={'bg-white border-0'}><TbAddressBook /></InputGroup.Text>
                <Form.Control  size={'lg'} 
                    className={'border-0'} required
                    placeholder={'Address Line 2'} 
                    defaultValue={user.line2} 
                    name={'line2'} 
                    onChange={(event) => handleChange(event)}/> 
                </InputGroup>
            </Form.Group>
            <Form.Group className={'mb-3 border ew-border-gradient'}>
                <InputGroup>
                <InputGroup.Text className={'bg-white border-0'}><FaCity/></InputGroup.Text>
                <Form.Control  size={'lg'} 
                    className={'border-0'} required
                    placeholder={'City'} 
                    defaultValue={user.city} 
                    name={'city'} 
                    onChange={(event) => handleChange(event)}/> 
                </InputGroup>
            </Form.Group>
            <Form.Group className={'mb-3 border ew-border-gradient'}>
                <InputGroup>
                <InputGroup.Text className={'bg-white border-0'}><HiOutlineGlobe/></InputGroup.Text>
                <Form.Control  size={'lg'} 
                    className={'border-0'} required
                    placeholder={'State'} 
                    defaultValue={user.state} 
                    name={'state'} 
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
                    selected={user.country}
                /> 
                </InputGroup>
            </Form.Group>
            <Form.Group className={'mb-3 border ew-border-gradient'}>
                <InputGroup>
                <InputGroup.Text className={'bg-white border-0'}><BsFillSignpostFill /></InputGroup.Text>
                <Form.Control  size={'lg'} 
                    className={'border-0'} required
                    placeholder={'Postal Code'} 
                    defaultValue={user.postal_code} 
                    name={'postal_code'} 
                    onChange={(event) => handleChange(event)}/> 
                </InputGroup>
            </Form.Group>
            <Form.Group className={'mb-3 border ew-border-gradient'}>
                <InputGroup>
                <InputGroup.Text className={'bg-white border-0'}><BsCardList /></InputGroup.Text>
                <Form.Control  size={'lg'} 
                    className={'border-0'} required
                    placeholder={'Web3.0 Wallet Address'} 
                    defaultValue={user.web3_wallet} 
                    name={'web3_wallet'} 
                    onChange={(event) => handleChange(event)}/> 
                </InputGroup>
            </Form.Group>
            <Form.Group className={'mb-3 border ew-border-gradient'}>
                <InputGroup>
                <InputGroup.Text className={'bg-white border-0'}><BsKey/></InputGroup.Text>
                <Form.Control  size={'lg'} 
                    className={'border-0'} required
                    placeholder={'Web3.0 Wallet Private Key'} 
                    defaultValue={user.wallet_key} 
                    name={'wallet_key'} 
                    onChange={(event) => handleChange(event)}/> 
                </InputGroup>
            </Form.Group>
            <Form.Group className={'mt-2'}>
                <Row>
                    <Col md={4}>
                    <Button className={'btn btn-primary'}
                        onClick={() => handleSubmit()}
                    >{menu === false ? 'Next' : 'Save'}</Button>
                    </Col>
                </Row>
            </Form.Group>
          </Card>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
      profileGet: (state.profile.user && state.profile.user.profile) || {},
      profileCreate: state.profile.create || {}
    }
};
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        createProfileRequest, updateProfileRequest, userProfileRequest
    }, dispatch);
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Profile);