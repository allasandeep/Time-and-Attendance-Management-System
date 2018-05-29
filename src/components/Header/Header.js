import React, { Component, Fragment } from "react";
import './Header.css';
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";


class Header extends Component {
  render() {
    return (
      <div>
        <br/>
        <div className="App container"  >
    <Navbar fluid collapseOnSelect  style={{backgroundColor:'black' ,borderRadius:'8px'}}  >
      <Navbar.Header >
        <Navbar.Brand>
          <a href="/" style={{color:'white'}}>{this.props.name}</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
     
    </Navbar>
  </div>  
 
    
  </div>
  
   
    );
  }
}

export default Header;
