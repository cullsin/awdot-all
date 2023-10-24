import React, {useState} from 'react';
import './index.scss';
import showSvg from '../../asset/images/ew-login-layout.svg';
import {Container, Row, Col, Image, Spinner} from 'react-bootstrap';
import LRedeem from '../../components/Redeem/List';
import ERedeem from '../../components/Redeem/Edit';
const RedeemLayout = (props) => {
    const [show, setShow] = useState(false);
    const [index, setIndex] = useState(0);
    const [redeem_id, setRedeemId] = useState();
    return (
    <>    
    <Container fluid className={'ew-redeem'}>
        <Row className={'align-items-center vh-100'}>
            <Col md={5} className={' d-flex align-items-center'}>
                <Row className={'justify-content-center'}>
                    <Col md={9} className={'justify-content-center d-flex align-items-center'}>    
                        {show === false && <Spinner color={'#BB82FD'} />}
                        <Image src={showSvg} fluid onLoad={() => setShow(true)}/>
                    </Col>
                </Row>       
            </Col>
            {index === 0 && <Col md={6}><LRedeem {...props} setIndex={setIndex} setRedeemId={setRedeemId} /></Col>}
            {index === 1 && <Col md={4}><ERedeem {...props} setIndex={setIndex} redeem_id={redeem_id}/></Col>}
        </Row>
    </Container>
    </>
    );
}

export default RedeemLayout;