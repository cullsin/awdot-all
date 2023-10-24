import React, {useState} from 'react';
import {Container, Row, Col, Spinner, Image} from 'react-bootstrap';
import { useLocation } from 'react-router-dom'
import SPurchase from '../../../components/Purchase/Status';
import '../index.scss';
import showSvg from '../../../asset/images/ew-login-layout.svg';
const PurchaseStatusLayout = () => {
    const [show, setShow] = useState(false);
    const search = useLocation().search;
    const purchase_id = new URLSearchParams(search).get('purchase_id');
    const payment_intent = new URLSearchParams(search).get('payment_intent');
    return  (
        <Container fluid className={'ew-purchase'}>
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
            <Row className={'justify-content-start'}>
                    <Col md={6}>
                    <SPurchase purchase_id={purchase_id} payment_intent={payment_intent} />
                    </Col>   
                </Row>
            </Col>
        </Row>
        </Container>
    )    
}

export default PurchaseStatusLayout;