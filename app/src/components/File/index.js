import React, {useState, useEffect} from 'react';
import {Card, InputGroup, Form, Button, ListGroup, Badge} from 'react-bootstrap';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { 
    initFileRequest,
    uploadFileRequest, 
    removeFileConnectRequest, 
    userFileConnectRequest, 
    insertFileConnectRequest } from '../../db/action/file';
import {HiOutlineUpload} from 'react-icons/hi';
import {MdOutlineSubtitles, MdCategory} from 'react-icons/md';
import {isUndefined, isEmpty, isObject } from 'lodash'
import PageHeader from '../PageHeader';
import Error from '../Error';
    
const File = (props) => {
    const {upload, userFiles, login, insert, remove, connect_id, setActiveIndex, indexNumber} = props;
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [listLoading, setListLoading] = useState(false);
    const [info, setInfo] = useState({
        content: '',
        variant: ''
    });
    const [upfile, setUpfile] = useState({
        title: '',
        category: 'user',
        genericFile: {
              value: '',
              fileItem: ''  
        }
    });
    const handleChange = (e) => {
        const {name, value} = e.target;
        const object = {...upfile};
        object[name] = value;
        setUpfile(object);
    };

    const handleFile = (e) => {
        const {name, files, value} = e.target;
        const object = {...upfile};
        object[name]['fileItem'] = files[0];
        object[name]['value'] = value;
        setUpfile(object);
    };

    const handleSubmit = () => {
        if (isEmpty(upfile.title) === true) {
            setInfo({
                ...info,
                  content: 'Please Give title of the Document',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        if (upfile.category === 'none') {
            setInfo({
                ...info,
                  content: 'Please Select the Purpose of the Document',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        if (isObject(upfile.genericFile.fileItem) === false) {
            setInfo({
                ...info,
                  content: 'Please Select a File',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        setLoading(true);
        props.uploadFileRequest({
            connect_id: connect_id ? connect_id : login.user_id,
            title: upfile.title,
            category: upfile.category,
            created_by: login.user_id,
            genericFile: upfile.genericFile.fileItem    
        })
    }

    useEffect(() => {
        const {success, code, message, file} = upload;
        if(isUndefined(success)) {
            return false;
        }
        if(success === true) {
            props.insertFileConnectRequest({
                file_id: file.id,
                connect_id: connect_id ? connect_id : login.user_id,
                connect_type: upfile.category,
                created_by: login.user_id
            });
            props.initFileRequest({});
        } else {
            setInfo({
                ...info,
                    content: `${code} - ${message}`,
                    variant: 'warning'
            });
            setShowError(true);
            setLoading(false);
        } 
    }, [upload]);

    useEffect(() => {
        const {success, code, message} = insert;
        if(isUndefined(success)) {
            return false;
        }
        if(success === true) { 
            setLoading(false);
            props.userFileConnectRequest({
                connect_id: connect_id ? connect_id : login.user_id
            });
            setListLoading(true);
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
        const {success, code, message} = userFiles;
        if(isUndefined(success)) {
            return false;
        }
        if(success === true) { 
            setListLoading(false);
        } else {
            setInfo({
                ...info,
                    content: `${code} - ${message}`,
                    variant: 'warning'
            });
            setShowError(true);
            setListLoading(false);
        } 
    }, [userFiles]);

    useEffect(() => {
        setListLoading(true);
        props.userFileConnectRequest({
            connect_id: connect_id ? connect_id : login.user_id
        });    
    }, [connect_id]);

    useEffect(() => {
        const {success, code, message} = remove;
        if(isUndefined(success)) {
            return false;
        }
        if(success === true) { 
            setListLoading(true);
            props.userFileConnectRequest({
                connect_id: connect_id ? connect_id : login.user_id
            });
        } else {
            setInfo({
                ...info,
                    content: `${code} - ${message}`,
                    variant: 'warning'
            });
            setShowError(true);
            setListLoading(false);
        } 
    }, [remove]);

    return (
        <React.Fragment>
        <PageHeader title={`Upload Documents`} show={loading} className={'mb-4'}/>
        {showError && <Error content={info.content} variant={info.variant} setShowError={setShowError} />}
        <Card border={'light'} className={'border-0'}>        
            <Form.Group className={'mb-3 border ew-border-gradient'}>
                <InputGroup>
                <InputGroup.Text className={'bg-white border-0'}><HiOutlineUpload /></InputGroup.Text>
                <Form.Control  size={'lg'} 
                    className={'border-0'} required
                    type='file'
                    placeholder={'Generic File'} 
                    defaultValue={upfile.genericFile.value} 
                    name={'genericFile'} 
                    onChange={(event) => handleFile(event)}/> 
                </InputGroup>
            </Form.Group>
            <Form.Group className={'mb-3 border ew-border-gradient'}>
                <InputGroup>
                <InputGroup.Text className={'bg-white border-0'}><MdOutlineSubtitles /></InputGroup.Text>
                <Form.Control  size={'lg'} 
                    className={'border-0'} required
                    placeholder={'title'} 
                    defaultValue={upfile.title} 
                    name={'title'} 
                    onChange={(event) => handleChange(event)}/> 
                </InputGroup>
            </Form.Group>
            <Form.Group className={'mb-3 border ew-border-gradient'}>
                <InputGroup>
                <InputGroup.Text className={'bg-white border-0'}><MdCategory /></InputGroup.Text>
                <Form.Select 
                    className={'border-0'}
                    onChange={(event) => handleChange(event)} name={'category'} defaultValue={'none'}>
                    <option value='none'>Select Document</option>
                    <option value="user-identity">Identification</option>
                    <option value="user-profile">User Picture</option>
                    <option value="companies-logo">Company logo</option>
                    <option value="companies-profile">Company Registeration</option>
                    <option value="investment-logo">Investment logo</option>
                    <option value="investment-profile">Investment Registeration</option>
                    <option value="partners-logo">partners logo</option>
                    <option value="partners-profile">partners Registeration</option>
                    <option value="transaction">Invoice Or Receipt</option>
                </Form.Select>
                </InputGroup>
            </Form.Group>
            <Form.Group className={'m-2 justify-content-end'}>
                <Button onClick={() => handleSubmit()}>
                    Submit
                  </Button>
            </Form.Group>      
        </Card>
        <PageHeader title={`Uploaded Files`} show={listLoading} className={'mt-4 mb-2'}/>
        <Card border={'light'} className={'border-0'}>
        <ListGroup>
            {props.userFiles.files && props.userFiles.files.length > 0 && Object.keys(props.userFiles.files).map((item, key) => {
                  const object = props.userFiles.files[item];  
                  return (<ListGroup.Item key={key}><Badge bg={'success'} className={'m-2 mb-0 mt-0'}>{object.file.title}</Badge><span>{object.file.name}</span>
                    <span className={'float-end'} onClick={() => props.removeFileConnectRequest({file_id:object.file.id})}>
                        <i className="bi bi-trash3"></i>
                    </span></ListGroup.Item>);  
            })}
        </ListGroup>
        </Card>
        {indexNumber && <Card border={'light'} className={'border-0 mt-5'}>
            <Form.Group className={'justify-content-end'}>
                <Button onClick={() => setActiveIndex(indexNumber)}>
                    {props.buttonName}
                  </Button>
            </Form.Group>
        </Card>}
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
        upload: state.file.upload || {},
        remove: state.file.removeConnect || {},
        insert: state.file.insert || {},
        userFiles: state.file.user || {},  
    }
};
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        uploadFileRequest, 
        initFileRequest,
        removeFileConnectRequest, 
        userFileConnectRequest, 
        insertFileConnectRequest
    }, dispatch);
};
  
export default connect(mapStateToProps, mapDispatchToProps)(File);