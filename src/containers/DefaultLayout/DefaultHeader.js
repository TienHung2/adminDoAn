import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  
  render() {
    var a = JSON.parse(sessionStorage.getItem('userData'));
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <Link to="/users" className="nav-link">Users</Link>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
    
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              {/* <img src='../../assets/img/avatars/6.jpg' className="img-avatar" alt="admin@bootstrapmaster.com" /> */}
              <img src="https://scontent.fdad1-1.fna.fbcdn.net/v/t1.0-9/56702350_1024579254415073_6640512484681711616_n.jpg?_nc_cat=105&_nc_oc=AQk6qbXX4YLXejn4lgcJwYbBVxIbTOzI9GuUnbiVceqk86cuTUA4hvRnDABCqZ636YcQj21mwtM5fkK0iCuq_LRd&_nc_ht=scontent.fdad1-1.fna&oh=da0abe24c39bfb988badf54846dd9e26&oe=5D3934AD" className="img-avatar" alt="admin@bootstrapmaster.com" />
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem header tag="div" className="text-center"><strong>{a[0].name}</strong></DropdownItem>
              <DropdownItem><i className="fa fa-envelope-o"></i> Messages</DropdownItem>
              <DropdownItem><i className="fa fa-tasks"></i> Tasks</DropdownItem>
              <DropdownItem><i className="fa fa-comments"></i> Comments</DropdownItem>
              <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
              <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>
              <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
              <DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem>
              <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
        
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
