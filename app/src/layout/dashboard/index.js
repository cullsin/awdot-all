import React, {useState} from 'react';
import './index.scss';
import showSvg from '../../asset/images/ew-login-layout.svg';
import {Container, Row, Col, Image, Spinner} from 'react-bootstrap';
import Dashboard from '../../components/Dashboard';
const DashboardLayout = (props) => {
    const [show, setShow] = useState(false);
    return (
    <>    
    <Container fluid className={'ew-dashboard'}>
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
                <Dashboard />
            </Col>
        </Row>
    </Container>
    </>
    );
}

export default DashboardLayout;