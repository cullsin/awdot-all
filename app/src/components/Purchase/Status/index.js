import React, {useEffect, useState} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updatePurchaseRequest } from '../../../db/action/purchase';
import {stripeReturnResponseRequest } from '../../../db/action/stripe';
import Confirmation from '../../Confirmation';
import PageHeader from '../../PageHeader';
import Error from '../../Error';
import {isUndefined } from 'lodash';

const SPurchase = (props) => {
    const {StripeResponse, PurchaseUpdate} = props;
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isDone, setDone] = useState(false);
    const [info, setInfo] = useState({
        content: '',
        variant: ''
    });
    useEffect(() => {
        const {success, code, message} = StripeResponse;
        if(isUndefined(success)) {
            return false;
        }
        if(success === true) { 
            props.updatePurchaseRequest({
                purchase_id: props.purchase_id,
                is_active: true
            });
        } else {
            setInfo({
                ...info,
                    content: `${code} - ${message}`,
                    variant: 'warning'
            });
            setShowError(true);
            setLoading(false);
        } 
    }, [StripeResponse]);

    useEffect(() => {
        const {success, code, message} = PurchaseUpdate;
        if(isUndefined(success)) {
            return false;
        }
        if(success === true) { 
            setLoading(false);
            setDone(true);
        } else {
            setInfo({
                ...info,
                    content: `${code} - ${message}`,
                    variant: 'warning'
            });
            setShowError(true);
            setLoading(false);
        } 
    }, [PurchaseUpdate]);

    useEffect(() => {
        setLoading(true);
        props.stripeReturnResponseRequest({
            payment_intent: props.payment_intent,
            purchase_id: props.purchase_id })
    }, []);

    return (
        <React.Fragment>
        <PageHeader title={'Purchase Status'} show={loading} className={'mb-4'}/>
        { showError && <Error content={info.content} variant={info.variant} setShowError={setShowError} />}
        { isDone === true && <Confirmation type={'SSPurchase'} /> }
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        login:state.login,
        PurchaseUpdate: state.purchase.update || {},
        StripeResponse: state.stripe.response || {}
    }
};
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        updatePurchaseRequest,
        stripeReturnResponseRequest
    }, dispatch);
};
  
export default connect(mapStateToProps, mapDispatchToProps)(SPurchase);