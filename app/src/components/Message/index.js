import React, {useState, useEffect} from 'react';
import {Card, InputGroup, Form, Button} from 'react-bootstrap';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createMessageRequest, getMessageRequest, deleteMessageRequest } from '../../db/action/message';
import moment from 'moment';

const Message = (props) => {
    const [content, setContent] = useState('');
    const [isRefresh, setRefresh] = useState(true);
    const handleChange = (e) => {
        setContent(e.target.value);
    };

    const handleSubmit = () => {
        props.createMessageRequest({
            escrow_id: props.escrow_id,
            message_user_id: props.login.user_id,
            content
        });
    }

    const refreshMessages = () => {
        props.getMessageRequest({
            escrow_id: props.escrow_id
        });
    }
    
    useEffect(() => {
        refreshMessages();
    }, []);

    useEffect(() => {
        if( isRefresh && (props.messageCreate.success === true || props.messageDelete.success === true) ) {
            setRefresh(false);
            refreshMessages();
        }
    }, [props.messageCreate, props.messageDelete]);

    return (
        <React.Fragment>
        <Card>
            <Card.Subtitle className={'justify-content-center p-3'}>Communicate</Card.Subtitle>
            <Form.Group className={'m-2'}>
                <InputGroup>
                <Form.Control  size={'lg'} 
                    name={'content'}
                    as={'textarea'}
                    rows={3} 
                    onChange={(event) => handleChange(event)}/> 
                </InputGroup>
            </Form.Group>
            <Form.Group className={'m-2 justify-content-end'}>
                <Button onClick={handleSubmit}>
                    Submit
                  </Button>
            </Form.Group>      
        </Card>
        <Card className={'mt-3 border-0'}>
        <Card.Subtitle className={'pt-1 pb-2'}>Conversations</Card.Subtitle>
            {props.messages.length > 0 && Object.keys(props.messages).map((item) => {
                  const message = props.messages[item];  
                  return (
                      <Card className={'mb-2'}>
                          <Card.Header>
                              <span>{message.user.firstName}{' '}{message.user.lastName} </span> 
                              <span className={'float-end'}> {moment(message.created_date).fromNow()}</span>
                          </Card.Header>
                          <Card.Body>
                              <span>{message.content}</span>
                          </Card.Body>
                          <Card.Footer>
                            <span className={'float-end'} onClick={() => props.deleteMessageRequest({message_id:message.message_id})}>
                                <i className="bi bi-trash3"></i>
                            </span>
                          </Card.Footer> 
                      </Card>
                  );  
            })}
        </Card>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
      all:state,
      escrow_id: state.escrow.escrow_id, 
      messageCreate: state.message.create || {},
      messageDelete: state.message.delete || {}, 
      messages: state.message.get || [],
      login: state.login || {}
    }
  };
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        createMessageRequest, 
        getMessageRequest, 
        deleteMessageRequest
    }, dispatch);
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Message);