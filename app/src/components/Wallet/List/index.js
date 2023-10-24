import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {Row, Card, Table, Image} from 'react-bootstrap';
import { useNavigate} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {isUndefined } from 'lodash';
import {TbCircleDot} from 'react-icons/tb';
import Confirmation from '../../Confirmation';
import { userWalletRequest, userWalletHistoryRequest } from '../../../db/action/wallet';
import PageHeader from '../../PageHeader';
import Error from '../../Error';
const LWallet = (props) => {
    const {login, Wallet} = props;
    const navigate = useNavigate();
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState({
        content: '',
        variant: ''
    });
    useEffect(() => {
        setLoading(true);
        props.userWalletRequest({
            created_by: login.user_id
        });
    }, []);

    useEffect(() => {
        const {success, code, message} = Wallet;
        if(isUndefined(success)) {
            return false;
        }
        if(success === true) { 
            setInfo({
                ...info,
                    content: `${code} - ${message}`,
                    variant: 'success'
            });
            setShowError(true);
            setLoading(false);
        } else {
            setInfo({
                ...info,
                    content: `${code} - ${message}`,
                    variant: 'warning'
            });
            setShowError(true);
            setLoading(false);
        } 
    }, [Wallet]);

    
    return (
        <React.Fragment>
        <PageHeader title={''} show={loading} className={'mb-4'}/>
        {showError && <Error content={info.content} variant={info.variant} setShowError={setShowError} />}
        <Card>
        {Wallet.wallet && Wallet.wallet.balance >= 0 && <Card.Header className={'p-2 bg-white text-end'}>
            <h4>{Wallet.wallet.balance}{' '}{ process.env.REACT_APP_CRYPTOCURRENCY } </h4>
        </Card.Header>}
        </Card>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
      login: state.login || {},
      Wallet: state.wallet.user || {}
    }
};
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        userWalletRequest
    }, dispatch);
};
  
export default connect(mapStateToProps, mapDispatchToProps)(LWallet);