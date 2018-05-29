import React, { Component } from 'react';
import './addEmployees.css';
import {Redirect} from 'react-router-dom'
import { PostData } from '../../services/PostData';
import  {confirmAlert} from 'react-confirm-alert';
import '../../styles/react-confirm-alert.css';
import { Alert,Modal,Button,FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from '../../components/LoaderButton/LoaderButton';


class addEmployees extends Component {

  constructor(props){
    super(props);
    this.state={
      projects: [],
      employees:[],
      selectedProjectId: '', 
      selectedEmployeeId: '',       
      redirect:false,
      modelCreated:false,
      modelNotcreated:false,
      hideForm:true,
      employeeAlertCheck:true,
      projectAlertCheck:true
    }

    this.logout = this.logout.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
   this.handleHide = this.handleHide.bind(this); 
  }

  handleHide() {
    this.setState({ modelCreated: false, modelNotcreated:false });
  }
 

  componentWillMount(){
    fetch('http://localhost/api/projects/read.php')
    .then((Response)=>Response.json())
    .then((findresponse)=>
    {    
      if(findresponse.message)
    {
    this.setState({projectmessage:findresponse.message, projectAlertCheck:false});
    }else{
    this.setState({
      projects:findresponse.records, hideForm:false
    })
  }
  })

  fetch('http://localhost/api/employee/readEmployeesOnly.php')
    .then((Response)=>Response.json())
    .then((findresponse)=>
  {   
    if(findresponse.message)
    {
    this.setState({employeemessage:findresponse.message, employeeAlertCheck:false});
    }else{
    this.setState({
      employees:findresponse.records, hideForm:false
    })
  
  }
})
  }

handleChange = event => {
  this.setState({
    [event.target.id]: event.target.value
  });
}

handleSubmit = event => {
  this.setState({ isLoading: true });
  event.preventDefault();
  if(this.state.selectedProjectId && this.state.selectedEmployeeId){
    PostData('addEmployees', this.state).then ((result)=>{
       
      let responseJSON = result;
        
        if(responseJSON.successMessage){
          this.setState({isLoading: false, modelCreated:true});
        
        }
        else if(responseJSON.message){
         
          this.setState({ isLoading: false,modelNotcreated: true , errorMessage:responseJSON.message });
        }
         
              
              })
      }
  else
  {    
    this.setState({ isLoading: false });

    if(!this.state.selectedEmployeeId)
    {
       this.setState({ employeenameEmpty: true});
    }
    if(!this.state.selectedProjectId)
    {
      this.setState({projectnameEmpty:true});
    }
  }
      
}

logout(){
  sessionStorage.setItem("userData",'');
  sessionStorage.clear();
  this.setState({redirect:true});
}


  render() {
    if(this.state.redirect){
      return(<Redirect to={'/'}/>)
      }    

      var projectsOptions = this.state.projects.map((dynamicData,key) =>{
        return(
            <option key={dynamicData.id} value={dynamicData.id}>{dynamicData.name}</option>
        )
    })

    var employeesOptions = this.state.employees.map((dynamicData,key) =>{
      return(
          <option key={dynamicData.id} value={dynamicData.id}>{dynamicData.employee_name} ({dynamicData.project_name})</option>
      )
  })

    return (
      <div><div className="row small-up-2 medium-up-3 large-up-4"> 
      
      <h4 style={{float:'left'}}>Add Employees</h4>
      <button type="button" className='btn btn-danger' style={{float:'right'}} onClick={this.logout}>Logout</button>
      <br/>
       <br/>
        <Alert bsStyle="danger" hidden={this.state.employeeAlertCheck} style={{width:'300px'}}>
            {this.state.employeemessage}
             </Alert>
             <Alert bsStyle="danger" hidden={this.state.projectAlertCheck} style={{width:'300px'}}>
            {this.state.projectmessage}
             </Alert>
      <div className="Login">      
      <form onSubmit={this.handleSubmit} hidden={this.state.hideForm}>    
        
        <FormGroup controlId="selectedProjectId" hidden={this.state.hideForm} >
        <ControlLabel>Select Project</ControlLabel>
        <FormControl  componentClass="select" autoFocus value={this.state.selectedProjectId} onChange={this.handleChange}>
        <option value="-1">select</option>
        {projectsOptions}
        </FormControl>
        </FormGroup>      
        <FormGroup controlId="selectedEmployeeId" >
        <ControlLabel>Select Employee</ControlLabel>
        <FormControl  componentClass="select"  value={this.state.selectedEmployeeId} onChange={this.handleChange}>
        <option value="-1">select</option>
        {employeesOptions}
        </FormControl>
        </FormGroup>   
        <LoaderButton
          block
          bsSize="large"
          type="submit"
          isLoading={this.state.isLoading}
          text="Add"
          loadingText="Adding.."      
          style={{borderRadius:'6px'}}
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
        Employee successfully added    
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
    Warning
  </Modal.Title>
  </Modal.Header>
  <Modal.Body>  
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

export default addEmployees;
