import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import featureJson from '../../data/AuthFeature/index.json';
import { connect } from 'react-redux'
import {isEmpty, includes} from 'lodash'

const Auth = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isDenied, setDenied] = useState(null)
    useEffect(() => {
        const pathArray = location.pathname.split('/');
        const path = pathArray && pathArray[1];
        const dataArray = featureJson.isAuth;
        if(isEmpty(props.login.user_id) === true ) {
            if(path.trim().length > 0 && includes(dataArray, path) === true) {
                setDenied(true);                
            } else {
                setDenied(false);
            }
        } else {
            setDenied(false);
        }    
    }, []);
    
    if (isDenied === null) return null;
    if (isDenied === true) { return window.location.href='/'; };
    if (isDenied === false) return (<>{props.children}</>);
}

const mapStateToProps = (state) => {
    return {
      login: state.login || {}
    }
};
  
export default connect(mapStateToProps)(Auth);