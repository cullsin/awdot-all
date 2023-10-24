import React, {useState, useEffect} from 'react';
import {Col, Row, InputGroup, Form, Button, Card} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { activateUserRequest } from '../../db/action/activateUser';
import { generateOtpRequest } from '../../db/action/generateOtp';
import { initLoginRequest } from '../../db/action/login';
import {isString, isUndefined} from 'lodash';
import { GrShieldSecurity } from 'react-icons/gr';
import PageHeader from '../PageHeader';
import Confirmation from '../Confirmation';
import Error from '../Error';
import isNumeric from 'validator/es/lib/isNumeric';

const ActivateUser = (props) => {
    const navigate = useNavigate();
    const {activate, setSuccess, generatedOtp} = props;
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState({
        content: '',
        variant: ''
    });
    const [user, setUser] = useState({
        otp: '',
        user_id: props.user_id
    });
    const handleChange = (e) => {
        const {name, value} = e.target;
        const object = user;
        object[name] = value;
        setUser({...user, object});
    };

    const handleGenerateOtp = () => {
        if (isString(user.user_id) === false) {
            setInfo({
                ...info,
                  content: 'User Information Missing',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        setLoading(true);
        props.generateOtpRequest({user_id: user.user_id});
    }

    const handleActivateUser = () => {
        if (isString(user.user_id) === false) {
            setInfo({
                ...info,
                  content: 'User Information Missing',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        if (isNumeric(user.otp) === false) {
            setInfo({
                ...info,
                  content: 'Invalid Number',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        setLoading(true);
        props.activateUserRequest(user);
    }

    useEffect(() => {
        const {success, code, message} = activate;
        if(isUndefined(success)) {
            return false;
        }
        if(success === true) { 
            props.initLoginRequest();
            setSuccess(true);
        } else {
            setInfo({
                ...info,
                content: `${code} - ${message}`,
                variant: 'warning'
            });
            setShowError(true);
            setLoading(false);
        } 
    }, [activate]);

    useEffect(() => {
        const {success, code, message} = generatedOtp;
        if(isUndefined(success)) {
            return false;
        }
        if(success === true) { 
            setInfo({
                ...info,
                content: `${message}`,
                variant: 'success'
            });
            setShowError(true);
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
    }, [generatedOtp]);

    return (
        <React.Fragment>
        <PageHeader title={'Activate User'} show={loading} className={'mb-4'}/>
        <Confirmation type={'infoActivateUser'} />
        {showError && <Error content={info.content} variant={info.variant} setShowError={setShowError} />}
        <Card border={'light'} className={'border-0'}>
            <Form.Group className={'mb-2 border ew-border-gradient'}>
                <InputGroup>
                <InputGroup.Text className={'bg-white border-0'}><GrShieldSecurity /></InputGroup.Text>
                <Form.Control  size={'lg'} placeholder={'Enter OTP'}  className={'border-0'} required maxLength={4}
                    defaultValue={user.otp} name={'otp'} onChange={(event) => handleChange(event)}
                /> 
                </InputGroup>
            </Form.Group>
            <Form.Group className={'mt-2'}>
            <Row>
                <Col md={4}>
                    <Button onClick={() => handleActivateUser()}>submit</Button>
                </Col>
                <Col md={8} className={'justify-content-end d-flex align-items-end col-md-8'}>
                        <Button onClick={() => handleGenerateOtp()}><small>Resend OTP</small></Button>                            
                </Col>
            </Row>
            </Form.Group>      
        </Card>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
      forget: state.user.forget || {},
      user_id: state.registerUser.user_id || state.login.user_id,
      activate: state.user.activate || {},
      generatedOtp: state.user.generatedOtp || {}
    }
};
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        activateUserRequest,
        generateOtpRequest,
        initLoginRequest
    }, dispatch);
};
  
export default connect(mapStateToProps, mapDispatchToProps)(ActivateUser);