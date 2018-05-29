import React, { Component } from 'react';
import './employeeSignup.css';
import {Redirect} from 'react-router-dom';
import { PostData } from '../../services/PostData';
import  {confirmAlert} from 'react-confirm-alert';
import '../../styles/react-confirm-alert.css';
import { Modal,Button,Alert,FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from '../../components/LoaderButton/LoaderButton';

class employeeSignup extends Component {

  constructor(props){
    super(props);
    this.state={
      categories: [],
      projects: [],
      selectedProjectId: 14,     
      fname: '',
      lname:'',
      username:'',
      email:'',
      password:'',
      position: '',
      salary: '',
      redirect:false
    }

    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.validateUsername = this.validateUsername.bind(this);
    this.validatefname = this.validatefname.bind(this);
    this.validatelname = this.validatelname.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.validatePosition = this.validatePosition.bind(this);
    this.validateSalary = this.validateSalary.bind(this);
    this.logout = this.logout.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

 

  componentWillMount(){    

  
  }

  



handleChange = event => {
  this.setState({
    [event.target.id]: event.target.value
  });
}

handleSubmit = event => {
  this.setState({ isLoading: true });
  event.preventDefault();
  if(this.state.fname && this.state.lname && this.state.username && this.state.email && this.state.password && this.state.position && this.state.salary ){
    PostData('employeesignup', this.state).then ((result)=>{
      let responseJSON = result;
      if(responseJSON.userData){
          sessionStorage.setItem('userData',responseJSON);     
          
          this.setState({isLoading: false, modelCreated:true});
         
          
      }
      else{      
        this.setState({ isLoading: false,modelNotcreated: true , errorMessage:responseJSON.message });

        
      }
      
      
    })
    
  }
  else
  {
     
    this.setState({ isLoading: false });
    if(!this.state.fname)
    {
       this.setState({ fnameEmpty: true});
    }
    if(!this.state.lname)
    {
      this.setState({lnameEmpty:true});
    }
    if(!this.state.username)
    {
      this.setState({usernameEmpty:true});
    }
    if(!this.state.password)
    {
      this.setState({passwordEmpty:true});
    }

    if(!this.state.email)
    {
      this.setState({emailEmpty:true});
    }
    if(!this.state.position)
    {
      this.setState({positionEmpty:true});
    }
    if(!this.state.salary)
    {
      this.setState({salaryEmpty:true});
    }
  }

  
  
}



validatefname(){
  if(this.state.fname.length > 0)
  return "success";
  
  if(this.state.fnameEmpty)
  return "error";
}

validatelname(){
  if(this.state.lname.length > 0)
  return "success";
  
  if(this.state.lnameEmpty)
  return "error";
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

validateEmail() {
  
  
  if(this.state.emailEmpty)
  {
    return "error";
  }

  
}

validatePosition() {
  if(this.state.position.length > 4)
  {
  return "success";
  }
  
  if(this.state.positionEmpty)
  {
    return "error";
  }

  
}

validateSalary() {
  if(this.state.salary.length > 4)
  {
  return "success";
  }
  
  if(this.state.salaryEmpty)
  {
    return "error";
  }

  
}

handleHide() {
  this.setState({ modelCreated: false });
  window.location.reload();
}

logout(){
  sessionStorage.setItem("userData",'');
  sessionStorage.clear();
  this.setState({redirect:true});
}


  render() {
    

    return (

      <div><div className="row small-up-2 medium-up-3 large-up-4"> 
      <h4 style={{float:'left'}}>Create Employee</h4>
      <button type="button" className='btn btn-danger' style={{float:'right'}} onClick={this.logout}>Logout</button>
      
    <div className="Signup">      
    <form onSubmit={this.handleSubmit}>
      <FormGroup controlId="fname" style={{float:'left', width:'295px'}} validationState={this.validatefname()}>
        <ControlLabel>First Name</ControlLabel> {' '}
        <FormControl
          autoFocus              
          value={this.state.fname}              
          onChange={this.handleChange}
        />
        <FormControl.Feedback />
      </FormGroup>{' '}
      <FormGroup controlId="lname"  style={{float:'right', width:'295px'}} validationState={this.validatelname()}>
        <ControlLabel>Last Name</ControlLabel>{' '}
        <FormControl                        
          value={this.state.lname}              
          onChange={this.handleChange}
        />
        <FormControl.Feedback />
      </FormGroup>
      <FormGroup controlId="username" style={{float:'left', width:'295px'}} validationState={this.validateUsername()}>
        <ControlLabel>Username</ControlLabel>
        <FormControl                        
          value={this.state.username}              
          onChange={this.handleChange}
        />
        <FormControl.Feedback />
      </FormGroup>     
      <FormGroup controlId="password" style={{float:'right' , width:'295px'}} validationState={this.validatePassword()}>
            <ControlLabel>Password</ControlLabel>
            <FormControl             
            style={{borderRadius:'4px',height:'34px'}}  
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="email"  style={{float:'left' , width:'600px'}} validationState={this.validateEmail()}>
        <ControlLabel>Email</ControlLabel>
        <FormControl   
          type="email"       
          style={{borderRadius:'4px',height:'34px'}}              
          value={this.state.email}              
          onChange={this.handleChange}
        />
        <FormControl.Feedback />
      </FormGroup>
      <FormGroup controlId="position"  style={{float:'left' , width:'295px'}} validationState={this.validatePosition()}>
        <ControlLabel>Job Title</ControlLabel>
        <FormControl            
          value={this.state.position}
          onChange={this.handleChange}
          
        />
        <FormControl.Feedback />
      </FormGroup>
      <FormGroup controlId="salary" style={{float:'right' , width:'295px'}} validationState={this.validateSalary()}>
        <ControlLabel>Salary</ControlLabel>
        <FormControl      
        style={{borderRadius:'4px',height:'34px'}}       
          value={this.state.salary}
          onChange={this.handleChange}
          type="number"
        />
        <FormControl.Feedback />
      </FormGroup>
   
      <LoaderButton
        block
        bsSize="large"
        type="submit"
        isLoading={this.state.isLoading}
        text="Create"
        loadingText="Creating.."      
        style={{borderRadius:'4px'}}
      />

 
        
      
    </form>
    <div className="modal-container" style={{ height: 200 }}>
 
 <Modal
    show={this.state.modelCreated}
    onHide={this.handleHide}
    container={this}
    aria-labelledby="contained-modal-title"
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title" style={{color:'green'}} >
        Success
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      Employee has been Created    
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={this.handleHide}>Close</Button>
    </Modal.Footer>
  </Modal>
  </div>

  <div className="modal-container" style={{ height: 200 }}>

<Modal
show={this.state.modelNotcreated}
onHide={this.handleHide}
container={this}
aria-labelledby="contained-modal-title"
>
<Modal.Header closeButton>
<Modal.Title id="contained-modal-title" style={{color:'red'}} >
  Error
</Modal.Title>
</Modal.Header>
<Modal.Body>
Unfortunately!Employee is not Created    
{this.state.errorMessage}
</Modal.Body>
<Modal.Footer>
<Button onClick={this.handleHide}>Close</Button>
</Modal.Footer>
</Modal>
</div>
  </div>
  </div>
  </div>
      
     
    );
  }
}

export default employeeSignup;
