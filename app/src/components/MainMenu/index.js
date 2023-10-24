import React, { useEffect, useState } from 'react';
import SidebarMenu from 'react-bootstrap-sidebar-menu';
import { logoutRequest } from '../../db/action/logout';
import { initLoginRequest } from '../../db/action/login';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {RiDashboardLine, RiAttachmentLine} from 'react-icons/ri';
import {GiPlagueDoctorProfile, GiBuyCard} from 'react-icons/gi';
import {BiBuildingHouse, BiCoin} from 'react-icons/bi';
import {AiOutlineUpload} from 'react-icons/ai';
import {SiWebmoney, SiHandshake } from 'react-icons/si';
import {CgLogOff} from 'react-icons/cg';
import {FaSellsy} from 'react-icons/fa';
import {TbWallet} from 'react-icons/tb';
import {AiOutlineBank} from 'react-icons/ai';

const MainMenu = (props) => {
  const navigate = useNavigate();
  const [isRtl, setIsRtl] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [collapseOnSelect, setCollapseOnSelect] = useState(false);
  const [exclusiveExpand, setExclusiveExpand] = useState(false);

  const themeName = isDarkTheme ? 'dark' : 'light';

  const onSelect = (eventKey) => {
    if (eventKey)
      document.getElementById(`${eventKey}`)?.scrollIntoView({ behavior: 'smooth' })
  }

  const clearAll = () => {
    props.initLoginRequest();
    props.logoutRequest();
  }
  
  return (
    <>
    <SidebarMenu
      defaultExpanded={false}
      exclusiveExpand={exclusiveExpand}
      collapseOnSelect={collapseOnSelect}
      onSelect={onSelect}
      variant={themeName}
      bg={themeName}
      expand="lg"
      hide="md"
    >
      <SidebarMenu.Collapse>
        <SidebarMenu.Header>
          <SidebarMenu.Brand title="React-Bootstrap" href="https://github.com/react-bootstrap/react-bootstrap">
            <span className="react-bootstrap-img" />
          </SidebarMenu.Brand>
          <SidebarMenu.Toggle />
        </SidebarMenu.Header>
        <SidebarMenu.Body>
          <SidebarMenu.Nav>
          <SidebarMenu.Nav.Link onClick={() => navigate('buy')}>
              <SidebarMenu.Nav.Icon><RiDashboardLine /></SidebarMenu.Nav.Icon>
              <SidebarMenu.Nav.Title>Home</SidebarMenu.Nav.Title>
            </SidebarMenu.Nav.Link>
            <SidebarMenu.Nav.Link onClick={() => navigate('file')}>
              <SidebarMenu.Nav.Icon><AiOutlineUpload/></SidebarMenu.Nav.Icon>
              <SidebarMenu.Nav.Title>Documents</SidebarMenu.Nav.Title>
            </SidebarMenu.Nav.Link>
            <SidebarMenu.Nav.Link onClick={() => navigate('profile')}>
              <SidebarMenu.Nav.Icon><GiPlagueDoctorProfile/></SidebarMenu.Nav.Icon>
              <SidebarMenu.Nav.Title>Profile</SidebarMenu.Nav.Title>
            </SidebarMenu.Nav.Link>
            <SidebarMenu.Nav.Link onClick={() => navigate('file')}>
              <SidebarMenu.Nav.Icon><RiAttachmentLine/></SidebarMenu.Nav.Icon>
              <SidebarMenu.Nav.Title>Documents</SidebarMenu.Nav.Title>
            </SidebarMenu.Nav.Link>
            <SidebarMenu.Nav.Link onClick={() => navigate('companies')}>
              <SidebarMenu.Nav.Icon><BiBuildingHouse/></SidebarMenu.Nav.Icon>
              <SidebarMenu.Nav.Title>Companies</SidebarMenu.Nav.Title>
            </SidebarMenu.Nav.Link>
            <SidebarMenu.Nav.Link onClick={() => navigate('investment')}>
              <SidebarMenu.Nav.Icon><SiWebmoney/></SidebarMenu.Nav.Icon>
              <SidebarMenu.Nav.Title>Investments</SidebarMenu.Nav.Title>
            </SidebarMenu.Nav.Link>
            <SidebarMenu.Nav.Link onClick={() => navigate('partners')}>
              <SidebarMenu.Nav.Icon><SiHandshake/></SidebarMenu.Nav.Icon>
              <SidebarMenu.Nav.Title>Partners</SidebarMenu.Nav.Title>
            </SidebarMenu.Nav.Link>
            <SidebarMenu.Nav.Link onClick={() => navigate('proposal')}>
              <SidebarMenu.Nav.Icon><BiCoin/></SidebarMenu.Nav.Icon>
              <SidebarMenu.Nav.Title>Proposal</SidebarMenu.Nav.Title>
            </SidebarMenu.Nav.Link>
            <SidebarMenu.Nav.Link onClick={() => alert('purchase')}>
              <SidebarMenu.Nav.Icon><GiBuyCard/></SidebarMenu.Nav.Icon>
              <SidebarMenu.Nav.Title>Purchase</SidebarMenu.Nav.Title>
            </SidebarMenu.Nav.Link>
            <SidebarMenu.Nav.Link onClick={() => navigate('bank')}>
              <SidebarMenu.Nav.Icon><AiOutlineBank/></SidebarMenu.Nav.Icon>
              <SidebarMenu.Nav.Title>Bank</SidebarMenu.Nav.Title>
            </SidebarMenu.Nav.Link>
            <SidebarMenu.Nav.Link onClick={() => navigate('redeem')}>
              <SidebarMenu.Nav.Icon><FaSellsy/></SidebarMenu.Nav.Icon>
              <SidebarMenu.Nav.Title>Redeem</SidebarMenu.Nav.Title>
            </SidebarMenu.Nav.Link>
            <SidebarMenu.Nav.Link onClick={() => navigate('wallet')}>
              <SidebarMenu.Nav.Icon><TbWallet/></SidebarMenu.Nav.Icon>
              <SidebarMenu.Nav.Title>Wallet</SidebarMenu.Nav.Title>
            </SidebarMenu.Nav.Link>
            <SidebarMenu.Nav.Link onClick={() => clearAll()}>
              <SidebarMenu.Nav.Icon><CgLogOff/></SidebarMenu.Nav.Icon>
              <SidebarMenu.Nav.Title>Log Off</SidebarMenu.Nav.Title>
            </SidebarMenu.Nav.Link>
          </SidebarMenu.Nav>
        </SidebarMenu.Body>
        <SidebarMenu.Footer>
        <SidebarMenu.Nav>
        </SidebarMenu.Nav>
        </SidebarMenu.Footer>
      </SidebarMenu.Collapse>
    </SidebarMenu>
    </>);
}

const mapStateToProps = (state) => {
  return {
    logout: state.logout,
    login: state.login
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
      logoutRequest,
      initLoginRequest
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);