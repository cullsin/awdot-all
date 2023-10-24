import React, {useState} from 'react';
import './index.scss';
import {Container, Row, Col, Form, InputGroup, Card} from 'react-bootstrap';
import LBuy from '../../components/Buy/List';
import GLBuy from '../../components/Gdb/List';
import EBuy from '../../components/Buy/Edit';

const BuyLayout = (props) => {
    const [show, setShow] = useState(false);
    const [index, setIndex] = useState(0);
    const [isOpen, setOpen] = useState(true);
    const [proposal_id, setProposalId] = useState();
    const handleChange = (e) => {
        const {name, value, checked} = e.target;
        setOpen(checked);
    };

    return (
    <>    
    <Container fluid className={'ew-buy'}>
        <Row className={'justify-content-center mb-5'}>
            {index === 0 && <Col md={7}>
                <Card border={'light'} className={'border ew-border-gradient mb-3'}>
                    <Card.Body>
                    <Form.Group className={'border-0'}>
                        <InputGroup>
                        <Form.Check  
                            type={'switch'}
                            size={'lg'}  
                            className={'border-0 ms-auto'} required
                            label={'Open / Hidden'}
                            checked={isOpen}
                            onChange={handleChange}
                        />
                        </InputGroup>
                    </Form.Group>
                    </Card.Body>
                </Card>
                {isOpen === true && <LBuy {...props} setIndex={setIndex} setProposalId={setProposalId} /> }
                {isOpen === false && <GLBuy {...props} /> }
            </Col>
            }
            {index === 1 && <Col md={4}><EBuy {...props} setIndex={setIndex} proposal_id={proposal_id}/></Col>}
        </Row>
    </Container>
    </>
    );
}

export default BuyLayout;