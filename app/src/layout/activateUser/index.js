import React, {useState} from 'react';
import './index.scss';
import showSvg from '../../asset/images/ew-login-layout.svg';
import {Container, Row, Col, Image, Spinner} from 'react-bootstrap';
import ActivateUser from '../../components/ActivateUser';
import Confirmation from '../../components/Confirmation';
const ActivateUserLayout = (props) => {
    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);
    return (
    <Container fluid className={'ew-activate-user-layout'}>
        <Row className={'align-items-center vh-100'}>
            <Col md={6} className={' d-flex align-items-center'}>
                <Row className={'justify-content-center'}>
                    <Col md={9} className={'justify-content-center d-flex align-items-center'}>    
                        {show === false && <Spinner color={'#BB82FD'} />}
                        <Image src={showSvg} fluid onLoad={() => setShow(true)}/>
                    </Col>
                </Row>       
            </Col>
            <Col md={6}>
                { success === false && <Row className={'justify-content-start'}>
                    <Col md={6}>
                        <ActivateUser setSuccess={setSuccess} />
                    </Col>   
                </Row> }
                { success === true && <Row className={'justify-content-center'}>
                    <Col md={12}>
                        <Confirmation type={'activateUser'} title={'Successful Member'} />
                    </Col>   
                </Row> }
            </Col>
        </Row>
    </Container>
    );
}

export default ActivateUserLayout;