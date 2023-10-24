import React, {useState, useEffect} from 'react';
import {Col, Row, InputGroup, Form, Button, Card, ListGroup, ListGroupItem} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Typeahead } from 'react-bootstrap-typeahead';
import PhoneCodeJson from '../../data/PhoneCode/index.json';
import { createUserRegisterRequest } from '../../db/action/registerUser';
import { HiOutlineMail, HiLightBulb } from 'react-icons/hi';
import { RiLockPasswordFill, RiUser3Line } from 'react-icons/ri';
import { FcPhone } from 'react-icons/fc';
import {isUndefined, isEmpty, isMatch} from 'lodash'
import PageHeader from '../PageHeader';
import Error from '../Error';
import isEmail from 'validator/es/lib/isEmail';
import matches from 'validator/es/lib/matches';
import isNumeric from 'validator/es/lib/isNumeric';
import isStrongPassword from 'validator/es/lib/isStrongPassword';

const RegisterUser = (props) => {
    const navigate = useNavigate();
    const {registerUser} = props;
    const [showError, setShowError] = useState(false);
    const [tooltip, setTooltip] = useState(false);
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState({
        content: '',
        variant: ''
    });
    const [user, setUser] = useState({
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        confirmPassword:'',
        phoneCode: [],
        phone:''
    });
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        const object = {...user};
        object[name] = value;
        setUser(object);
    };

    const handlePhoneCode = (valueMixed) => {
        const object = {...user};
        object.phoneCode = valueMixed.length ? [valueMixed[0].dial_code]: [];
        setUser(object); 
    };

    const handleSubmit = () => {
        if (matches(user.firstName,/^[A-z ]+$/) === false) {
            setInfo({
                ...info,
                  content: 'Invalid First Name',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        if (matches(user.lastName,/^[A-z ]+$/) === false) {
            setInfo({
                ...info,
                  content: 'Invalid Last Name',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        if (isEmail(user.email) === false) {
            setInfo({
                ...info,
                  content: 'Invalid Email',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
       }
       if (isEmpty(user.phoneCode) === true) {
            setInfo({
                ...info,
                content: 'Invalid Phone Code. Please Choose from the List',
                variant: 'warning'
            });
            setShowError(true);
            return;  
       }
       if (isNumeric(user.phone) === false) {
        setInfo({
            ...info,
              content: 'Invalid Phone Number. Please Give only Numbers',
              variant: 'warning'
        });
        setShowError(true);
        return;  
       }
        if (isStrongPassword(user.password) === false) {
          setInfo({
              ...info,
                content: 'Invalid Password',
                variant: 'warning'
          });
          setShowError(true);
          return;  
        }
        if (isMatch(user.password, user.confirmPassword) === false) {
            setInfo({
                ...info,
                  content: 'Password and Confirm Password must Match',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        setLoading(true);
        const data = {...user};
        data.phone = data.phoneCode[0] + data.phone;
        props.createUserRegisterRequest(data);
    }
    useEffect(() => {
        const {success, code, message} = registerUser;
        if(isUndefined(success)) {
            return false;
        }
        if(success === true) { 
            navigate('/active');
        } else {
            setInfo({
                ...info,
                    content: `${code} - ${message}`,
                    variant: 'warning'
            });
            setShowError(true);
            setLoading(false);
        } 
    }, [registerUser]);

    return (
        <React.Fragment>
        <PageHeader title={'Sign up'} show={loading} className={'mb-4'}/>
        {showError && <Error content={info.content} variant={info.variant} setShowError={setShowError} />}
        <Card border={'light'} className={'border-0'}>
            <Form.Group className={'mb-3 border ew-border-gradient'}>
                <InputGroup>
                <InputGroup.Text className={'bg-white border-0'}><RiUser3Line /></InputGroup.Text>
                <Form.Control  size={'lg'} 
                    className={'border-0'} required
                    placeholder={'First Name'} 
                    defaultValue={user.firstName} 
                    name={'firstName'} 
                    onChange={(event) => handleChange(event)}/> 
                </InputGroup>
            </Form.Group>
            <Form.Group className={'mb-3 border ew-border-gradient'}>
                <InputGroup>
                <InputGroup.Text className={'bg-white border-0'}><RiUser3Line /></InputGroup.Text>
                <Form.Control
                    className={'border-0'} required 
                    placeholder={'Last Name'} 
                    defaultValue={user.lastName} 
                    name={'lastName'} 
                    onChange={(event) => handleChange(event)}/> 
                </InputGroup>
            </Form.Group>
            <Form.Group className={'mb-3 border ew-border-gradient'}>
                <InputGroup>
                <InputGroup.Text className={'bg-white border-0'}><HiOutlineMail/></InputGroup.Text>
                <Form.Control  size={'lg'} 
                    className={'border-0'} required
                    placeholder={'Email'} 
                    defaultValue={user.email} 
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
                    selected={user.phoneCode}
                />
                <Form.Control  size={'lg'} 
                    className={'border-0'} required
                    placeholder={'Phone'} 
                    defaultValue={user.phone} 
                    name={'phone'} 
                    onChange={(event) => handleChange(event)}/> 
                </InputGroup>
            </Form.Group>
            <Form.Group className={'mb-3 border ew-border-gradient'}>
            <InputGroup>
                <InputGroup.Text className={'bg-white border-0'}><RiLockPasswordFill /></InputGroup.Text>
                <Form.Control  size={'lg'} className={'border-0'} 
                placeholder={'Password'} required type={'password'}
                defaultValue={user.password} name={'password'} onChange={(event) => handleChange(event)}
                /> 
                <InputGroup.Text className={'bg-white border-0'}>
                    <HiLightBulb color={tooltip === true ? '#BB82FD' : '#000000'} onClick={() => setTooltip(!tooltip)} />
                </InputGroup.Text>
                </InputGroup>
            </Form.Group>
            {tooltip === true && 
                <Form.Group className={'mb-3 border border-danger'}>
                 <ListGroup>
                    <ListGroupItem><small>minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1</small></ListGroupItem>
                </ListGroup>
            </Form.Group> }
            <Form.Group className={'mb-3 border ew-border-gradient'}>
                <InputGroup>
                <InputGroup.Text className={'bg-white border-0'}><RiLockPasswordFill /></InputGroup.Text>
                <Form.Control  size={'lg'} 
                    className={'border-0'} required    
                    type={'password'}
                    placeholder={'Confirm password'} 
                    defaultValue={user.confirmPassword} 
                    name={'confirmPassword'} 
                    onChange={(event) => handleChange(event)}/> 
                </InputGroup>
            </Form.Group>
            <Form.Group className={'mt-2'}>
                <Row>
                    <Col md={4}>
                    <Button className={'btn btn-primary'}
                        onClick={() => handleSubmit()}
                    >submit</Button>
                    </Col>
                    <Col md={8} className={'justify-content-end d-flex align-items-end col-md-8'}>
                        <Link to={'/login'} className={'text-decoration-none'}><small>login</small></Link>                            
                    </Col>
                </Row>
            </Form.Group>
          </Card>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
      registerUser: state.registerUser
    }
  };
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        createUserRegisterRequest,
    }, dispatch);
};
  
export default connect(mapStateToProps, mapDispatchToProps)(RegisterUser);