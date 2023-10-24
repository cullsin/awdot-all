import React from 'react';
import { Card, Row, Col, Spinner} from 'react-bootstrap';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
const PageHeader = (props) => {
    const { title, show, className } = props;
    return (
        <React.Fragment>
        <Card border={`light`} className={`border-0 ${className}`}>
            <Row>
                <Col md={10}>
                    <Card.Title className={'text-purple'}>{title}</Card.Title>
                </Col>
                <Col md={2}>
                    { show && <Spinner variant={'warning'} animation={'border'} size={'sm'} /> }
                </Col>
            </Row>
        </Card>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
    }
};
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
    }, dispatch);
};
  
export default connect(mapStateToProps, mapDispatchToProps)(PageHeader);