import React, {useState} from 'react';
import './index.scss';
import showSvg from '../../asset/images/ew-login-layout.svg';
import {Container, Row, Col, Image, Spinner} from 'react-bootstrap';
import LProposal from '../../components/Proposal/List';
import EProposal from '../../components/Proposal/Edit';
const ProposalLayout = (props) => {
    const [show, setShow] = useState(false);
    const [index, setIndex] = useState(0);
    const [proposal_id, setProposalId] = useState();
    return (
    <>    
    <Container fluid className={'ew-proposal'}>
        <Row className={'align-items-center vh-100'}>
            <Col md={6} className={' d-flex align-items-center'}>
                <Row className={'justify-content-center'}>
                    <Col md={9} className={'justify-content-center d-flex align-items-center'}>    
                        {show === false && <Spinner color={'#BB82FD'} />}
                        <Image src={showSvg} fluid onLoad={() => setShow(true)}/>
                    </Col>
                </Row>       
            </Col>
            {index === 0 && <Col md={5}><LProposal {...props} setIndex={setIndex} setProposalId={setProposalId} /></Col>}
            {index === 1 && <Col md={4}><EProposal {...props} setIndex={setIndex} proposal_id={proposal_id}/></Col>}
        </Row>
    </Container>
    </>
    );
}

export default ProposalLayout;