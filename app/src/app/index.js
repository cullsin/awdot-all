import React, {useEffect, useState} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {getTokenRequest} from '../db/action/token';
import Auth from '../layout/auth';
import Footer from '../layout/footer';
import Content from '../layout/content';
import MainMenu from '../components/MainMenu';
import Header from '../components/Header';
import {Spinner, Row, Col, Container} from 'react-bootstrap';
import { getSubDomain, isDomainRouter } from '../engine';

function App(props) {
  const navigate = useNavigate();
  const options = getSubDomain();
  useEffect(() => {
    if(!props.token.accessToken) {
      props.getTokenRequest();
    }
  }, []);

  useEffect(() => {
    if(props.logout === null) {
      navigate('/');
    }
  }, [props]);
  
  if (isDomainRouter(options) === true) {
    return <div className={`main-wrapper`}>
        <Content/>
    </div>
  }  
  
  if(props.login.user_id) {
      return <React.Fragment><div className={`main-wrapper multiple-grid`}>
      <Header />
       <MainMenu />
        <Auth>
          <Content/>
        </Auth>
      </div><div>  
      <Footer/>
    </div>
    </React.Fragment>
  }
  
  if(props.token.accessToken && !props.login.user_id) {
      return <div className={`main-wrapper`}>
        <Auth>
          <Content/>
        </Auth>
        <Footer/>
      </div>
  }
  
  return <Container fluid><Row className={'align-items-center justify-content-center'}>
      <Col md={1}> 
        <Spinner animation={'border'} variant={'success'}/>
      </Col>
      </Row>
    </Container>
}

const mapStateToProps = (state) => {
  return {
    logout: state.logout,
    token: state.token,
    login: state.login
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getTokenRequest,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);