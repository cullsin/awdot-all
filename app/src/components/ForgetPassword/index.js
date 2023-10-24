import React, {useState, useEffect} from 'react';
import {Col, Row, InputGroup, Form, Button, Card} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {isUndefined} from 'lodash';
import { forgetPasswordRequest } from '../../db/action/forgetPassword';
import { HiOutlineMail } from 'react-icons/hi';
import PageHeader from '../PageHeader';
import Error from '../Error';
import isEmail from 'validator/es/lib/isEmail';

const ForgetPassword = (props) => {
    const navigate = useNavigate();
    const {forget} = props;
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState({
        content: '',
        variant: ''
    });
    const [user, setUser] = useState({
        email:''
    });
    const handleChange = (e) => {
        const {name, value} = e.target;
        const object = user;
        object[name] = value;
        setUser(object);
    };

    const handleForgetPassword = () => {
        if (isEmail(user.email) === false) {
            setInfo({
                ...info,
                  content: 'Invalid Email',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
       }
       setLoading(true);
       props.forgetPasswordRequest(user);
    }

    useEffect(() => {
        const {success, message, code } = forget;
        if(isUndefined(success)) {
            return false;
        }
        if(success === true) { 
            setInfo({
                ...info,
                    content: message,
                    variant: 'success'
            });
        } else {
            setInfo({
                ...info,
                content: `${code} - ${message}`,
                variant: 'warning'
            });
        }
        setShowError(true);
        setLoading(false);     
    }, [forget]);

    return (
        <React.Fragment>
        <PageHeader title={'Forget Password'} show={loading} className={'mb-4'}/>
        {showError && <Error content={info.content} variant={info.variant} setShowError={setShowError} />}
        <Card border={'light'} className={'border-0'}>
            <Form.Group className={'mb-2 border ew-border-gradient'}>
                <InputGroup>
                    <InputGroup.Text className={'bg-white border-0'}><HiOutlineMail /></InputGroup.Text>
                    <Form.Control  size={'lg'} placeholder={'Email'} className={'border-0'} required
                        defaultValue={user.email} name={'email'} onChange={(event) => handleChange(event)} /> 
                </InputGroup>
            </Form.Group>
            <Form.Group className={'mt-2'}>
                <Row>
                    <Col md={4}>
                    <Button onClick={handleForgetPassword}>submit</Button>
                    </Col>
                </Row>
            </Form.Group>
        </Card>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
      forget: state.user.forget || {}
    }
  };
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        forgetPasswordRequest,
    }, dispatch);
};
  
export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword);