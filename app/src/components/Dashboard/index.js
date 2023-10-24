import React, { useEffect } from 'react';
import { Row, Col} from 'react-bootstrap';
import { useNavigate} from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Confirmation from '../Confirmation';
import {isEmpty} from 'lodash'
import {userProfileRequest} from '../../db/action/profile';
const Dashboard = (props) => {
    
    const navigate = useNavigate();
    const {login} = props;
    useEffect(() => {
        if(isEmpty(login) === true) {
            return navigate('/login');
        }
        props.userProfileRequest();
    }, []);
    
    return (
        <React.Fragment>
            <Row className={'justify-content-start mb-5'}>
                    <Col md={6}>
                        <Confirmation type={'BuyerDashboard'} title={'Buyer Way'} />
                    </Col>   
            </Row>
            <Row className={'justify-content-start pt-5'}>
                    <Col md={6}>
                        <Confirmation type={'SellerDashboard'} title={'Seller Way'} />
                    </Col>   
            </Row>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
      login: state.login || {}
    }
  };
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        userProfileRequest
    }, dispatch);
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);