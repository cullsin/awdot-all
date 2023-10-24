import React from 'react';
import { Container, Navbar} from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const Header = (props) => {
    return (
        <React.Fragment>
            <Navbar>
                <Container>
                    <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    Signed in as: {props.login.name}
                </Navbar.Text>
                </Navbar.Collapse>
                </Container>
            </Navbar>
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
    }, dispatch);
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Header);