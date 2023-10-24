import React, {useState, useEffect} from 'react';
import {Card, InputGroup, Form, Button, ListGroup, Badge} from 'react-bootstrap';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { 
    typeDomainRequest,
    insertDomainRequest,
    updateDomainRequest    
} from '../../db/action/domain';
import {TbGenderEpicene} from 'react-icons/tb';
import {MdOutlineSubtitles, MdCategory} from 'react-icons/md';
import {isUndefined, isEmpty, isObject } from 'lodash'
import PageHeader from '../PageHeader';
import Error from '../Error';
    
const Domain = (props) => {
    const { type, type_id, setIsDone, insert, update, getType } = props;
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState({
        content: '',
        variant: ''
    });
    const [updomain, setUpdomain] = useState({
        name: '',
        type,
        type_id,
        domain_id:''
    });
    const handleChange = (e) => {
        let {name, value} = e.target;
        const object = {...updomain};
        object[name] = value.toLowerCase().replace(' ','_');
        setUpdomain(object);
    };

    const handleSubmit = () => {
        if (isEmpty(updomain.name) === true) {
            setInfo({
                ...info,
                  content: 'Please give a domain name',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        setLoading(true);
        if(updomain.domain_id === '') {
            props.insertDomainRequest({
                type_id: updomain.type_id,
                type: updomain.type,
                name: updomain.name    
            })
        } else {
            props.updateDomainRequest({
                type_id: updomain.type_id,
                type: updomain.type,
                name: updomain.name,
                domain_id: updomain.domain_id    
            })
        }
    }

    useEffect(() => {
        props.typeDomainRequest({
            type_id
        }) 
    }, []);

    useEffect(() => {
        const {success, code, message} = insert;
        if(isUndefined(success)) {
            return false;
        }
        if(success === true) { 
            setLoading(false);
            setIsDone(true);
        } else {
            setInfo({
                ...info,
                    content: `${code} - ${message}`,
                    variant: 'warning'
            });
            setShowError(true);
            setLoading(false);
        } 
    }, [insert]);

    useEffect(() => {
        const {success, code, message, domain} = getType;
        if(isUndefined(success)) {
            return false;
        }
        if(success === true) { 
            setUpdomain(domain);
        } else {
            setInfo({
                ...info,
                    content: `${code} - ${message}`,
                    variant: 'warning'
            });
            setShowError(true);
        } 
    }, [getType]);

    useEffect(() => {
        const {success, code, message} = update;
        if(isUndefined(success)) {
            return false;
        }
        if(success === true) { 
            setLoading(false);
            setIsDone(true);
        } else {
            setInfo({
                ...info,
                    content: `${code} - ${message}`,
                    variant: 'warning'
            });
            setShowError(true);
            setLoading(false);
        } 
    }, [update]);

    return (
        <React.Fragment>
        <PageHeader title={`Configure Domain `} show={loading} className={'mb-4'}/>
        {showError && <Error content={info.content} variant={info.variant} setShowError={setShowError} />}
        <Card border={'light'} className={'border-0'}>        
            <Form.Group className={'mb-3 border ew-border-gradient'}>
                <InputGroup>
                <InputGroup.Text className={'bg-white border-0'}><MdOutlineSubtitles /></InputGroup.Text>
                <Form.Control  size={'lg'} 
                    className={'border-0'} required
                    placeholder={'name'} 
                    defaultValue={updomain.name} 
                    name={'name'} 
                    onChange={(event) => handleChange(event)}/> 
                <InputGroup.Text className={'bg-white border-0'}>.awdot.com</InputGroup.Text>
                </InputGroup>
            </Form.Group>
            <Form.Group className={'m-2 justify-content-end'}>
                <Button onClick={() => handleSubmit()}>
                    Submit
                  </Button>
            </Form.Group>      
        </Card>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
        getType: state.domain.type || {},
        insert: state.domain.insert || {},
        update: state.domain.update || [],  
    }
};
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        insertDomainRequest,
        typeDomainRequest,
        updateDomainRequest
    }, dispatch);
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Domain);