import React, { Component } from 'react';
import './Welcome.css';
import {Button} from "react-bootstrap";


class Welcome extends Component {
  render() {
    return (
      
    <div> <div className="row small-up-2 medium-up-3 large-up-4" style={{textAlign:'center',minHeight:'440px'}}>
    <h4>This system monitors the employee working hours</h4>
    <div style={{textAlign:'center',position:'relative', top:'130px'}}>
    
    <h5>Click to Login</h5>
    
    <a href="/login" className='btn btn-primary margin-bottom-1em' >Login</a>
    
   
    
    </div>
    </div>
    </div>
    );
  }
}

export default Welcome;
