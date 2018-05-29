import React, { Component } from 'react';
import './Login.css';
import {Redirect} from 'react-router-dom'
import { PostData } from '../../services/PostData';
import  {confirmAlert} from 'react-confirm-alert';
import '../../styles/react-confirm-alert.css';
import { FormGroup, FormControl, ControlLabel ,Alert} from "react-bootstrap";
import LoaderButton from '../../components/LoaderButton/LoaderButton';


class Login extends Component {

  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      username:'',
      password:'', 
      redirect:false,     
      incorrect: true,
      fieldsEmpty:true,     
      employee_id:'',
      type:''     
    }   
    
    this.validatePassword = this.validatePassword.bind(this);
    this.validateUsername = this.validateUsername.bind(this);
  }

  validateUsername() {
    if(this.state.username.length > 3)
    {
    return "success";
    }
    
    if(this.state.usernameEmpty)
    {
      return "error";
    }
  }

  validatePassword() {
    if(this.state.password.length > 6)
    {
      
    return "success";
    }
    
    if(this.state.passwordEmpty)
    {
      return "error";
    }
  }

handleChange = event => {
  this.setState({
    [event.target.id]: event.target.value
  });
}

handleSubmit = event => {
  this.setState({ isLoading: true });
  event.preventDefault();
  if(this.state.username && this.state.password){
    PostData('login', this.state).then ((result)=>{
      let responseJSON = result;     
      if(responseJSON.userData){
          sessionStorage.setItem('userData',responseJSON);   
          sessionStorage.setItem('type',JSON.stringify(responseJSON.userData.type));   
          sessionStorage.setItem('id',JSON.stringify(responseJSON.userData.id));     
          this.state.employee_id = responseJSON.userData.id;
          this.setState({type:responseJSON.userData.type,redirect:true, fieldsEmpty:true, incorrect:true});               
          
          
      }
      else{
        this.setState({ isLoading: false, fieldsEmpty: true, incorrect: false }); 
        
      }
      
    })
  }
  else
  {
    this.setState({
      isLoading: false,
      incorrect: true
       });   
       
       if(!this.state.username && !this.state.password)
       {
         this.setState({fieldsEmpty:false});
       }

       if(!this.state.username)
       {
         this.setState({usernameEmpty:true});
       }
       if(!this.state.password)
       {
         this.setState({passwordEmpty:true});
       }
  }
  
}

  render() {

    const { redirect, username } = this.state
    

    if(this.state.redirect  && this.state.type == "Admin"){     
    return(<Redirect  to={{ pathname: '/home/' + this.state.employee_id  }}/>)
    }else if(this.state.redirect && this.state.type == "Employee"){
      return(<Redirect to={{ pathname: '/employeeHome/' + this.state.employee_id  }}/>)
      }else if(this.state.redirect  && this.state.type == "Supervisor"){     
      return(<Redirect to={{ pathname: '/supervisorHome/' + this.state.employee_id  }}/>)
      }      

      if(sessionStorage.getItem("userData"))
      {
      var type = JSON.parse(sessionStorage.getItem('type'));
      var id =  JSON.parse(sessionStorage.getItem('id'));     
      }

      

    if(sessionStorage.getItem("userData") && (type == "Employee")){
          return(<Redirect to={{ pathname:'/employeeHome/'+ id }}/>)
          }else if(sessionStorage.getItem("userData") && (type == "Admin")){
      return(<Redirect to={{ pathname: '/home/' + id  }}/>)
      }else if(sessionStorage.getItem("userData") && (type == "Supervisor")){
          return(<Redirect to={{ pathname: '/supervisorHome/' + id  }}/>)
          }
          



      return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="username" bsSize="large" validationState={this.validateUsername()}>
            <ControlLabel>Username</ControlLabel>
            <FormControl
              autoFocus              
              value={this.state.username}              
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large" validationState={this.validatePassword()}>
            <ControlLabel>Password</ControlLabel>
            <FormControl
              
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
            <FormControl.Feedback />
          </FormGroup>
          <LoaderButton
            block
            bsSize="large"
            type="submit"
            isLoading={this.state.isLoading}
            text="Login"
            loadingText="Logging in…"      
            style={{borderRadius:'6px'}}
          />
          <br/>
          <Alert bsStyle="danger" hidden={this.state.fieldsEmpty}>
            Fields are Empty .
             </Alert>
             <Alert bsStyle="danger" hidden={this.state.incorrect}>
            Incorrect Username/Password .
             </Alert>
        </form>
      </div>
      
      
    );
  }
}

export default Login;
