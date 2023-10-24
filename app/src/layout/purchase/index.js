import React, {useState} from 'react';
import './index.scss';
import showSvg from '../../asset/images/ew-login-layout.svg';
import {Container, Row, Col, Image, Spinner} from 'react-bootstrap';
import LPurchase from '../../components/Purchase/List';
import EPurchase from '../../components/Purchase/Edit';
const PurchaseLayout = (props) => {
    const [show, setShow] = useState(false);
    const [index, setIndex] = useState(0);
    const [purchase_id, setPurchaseId] = useState();
    return (
    <>    
    <Container fluid className={'ew-purchase'}>
        <Row className={'align-items-center vh-100'}>
            <Col md={5} className={' d-flex align-items-center'}>
                <Row className={'justify-content-center'}>
                    <Col md={9} className={'justify-content-center d-flex align-items-center'}>    
                        {show === false && <Spinner color={'#BB82FD'} />}
                        <Image src={showSvg} fluid onLoad={() => setShow(true)}/>
                    </Col>
                </Row>       
            </Col>
            {index === 0 && <Col md={6}><LPurchase {...props} setIndex={setIndex} setPurchaseId={setPurchaseId} /></Col>}
            {index === 1 && <Col md={4}><EPurchase {...props} setIndex={setIndex} purchase_id={purchase_id}/></Col>}
        </Row>
    </Container>
    </>
    );
}

export default PurchaseLayout;