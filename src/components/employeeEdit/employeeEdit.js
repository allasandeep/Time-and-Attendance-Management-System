import React, { Component } from 'react';
import './employeeEdit.css';
import {Redirect} from 'react-router-dom'
import { PostData } from '../../services/PostData';
import  {confirmAlert} from 'react-confirm-alert';
import '../../styles/react-confirm-alert.css';
import { Modal,Button,FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from '../../components/LoaderButton/LoaderButton';

class employeeEdit extends Component {

  constructor(props){
    super(props);
    this.state={
      id:'',
      employee:[],
      projects: [],          
      fname: '',
      lname:'',     
      password:'',
      position: '',
      salary: '',
      redirect:false
    }

   
    
    this.validatefname = this.validatefname.bind(this);
    this.validatelname = this.validatelname.bind(this);
    this.validatePosition = this.validatePosition.bind(this);
    this.validateSalary = this.validateSalary.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.logout = this.logout.bind(this);
    this.handleHide = this.handleHide.bind(this);
  }

  logout(){
    sessionStorage.setItem("userData",'');
    sessionStorage.clear();
    this.setState({redirect:true});
  }

  componentWillMount(){    
    const {match: {params}} = this.props;     
    this.state.id = params.empid; 
  fetch('http://localhost/api/projects/read.php')
  .then((Response)=>Response.json())
  .then((findresponse)=>
  {    
  this.setState({
    projects:findresponse.records,
  })
})

fetch('http://localhost/api/employee/read_one.php?id=' + params.empid)
  .then((Response)=>Response.json())
  .then((findresponse)=>
  {        
    this.setState({
      employee:findresponse.records,
      id:findresponse.records[0].id,
      fname:findresponse.records[0].fname,
      lname:findresponse.records[0].lname,      
      position:findresponse.records[0].position,
      salary:findresponse.records[0].salary,
      selectedProjectId:findresponse.records[0].project_id

    })
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
    if(this.state.id && this.state.fname && this.state.lname  && this.state.position && this.state.salary && this.state.selectedProjectId ){
      PostData('employeeedit', this.state).then ((result)=>{
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

  render() { 
    if(this.state.redirect){
      return(<Redirect to={'/'}/>)
      }

      var projectsOptions = this.state.projects.map((dynamicData,key) =>{
        return(
            <option key={dynamicData.id} value={dynamicData.id}>{dynamicData.name}</option>
        )
    })

    return (
      
     <div><div className="row small-up-2 medium-up-3 large-up-4"> 
     <h4 style={{float:'left'}}>Edit Employee</h4>
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
      <FormGroup controlId="lname" style={{float:'right', width:'295px'}} validationState={this.validatelname()}>
        <ControlLabel>Last Name</ControlLabel>{' '}
        <FormControl                        
          value={this.state.lname}              
          onChange={this.handleChange}
        />
        <FormControl.Feedback />
      </FormGroup>    
      
      <FormGroup controlId="position" style={{float:'left', width:'295px'}} validationState={this.validatePosition()}>
        <ControlLabel>Job Title</ControlLabel>
        <FormControl            
          value={this.state.position}
          onChange={this.handleChange}
          
        />
        <FormControl.Feedback />
      </FormGroup>
      <FormGroup controlId="salary" style={{float:'right', width:'295px'}} validationState={this.validateSalary()}>
        <ControlLabel>Salary</ControlLabel>
        <FormControl 
        style={{borderRadius:'6px',height:'34px'}}           
          value={this.state.salary}
          onChange={this.handleChange}
          type="number"
        />
        <FormControl.Feedback />
      </FormGroup>
      <FormGroup controlId="selectedProjectId" style={{float:'left', width:'600px'}} >
        <ControlLabel>Select Project</ControlLabel>
        <FormControl  componentClass="select"  value={this.state.selectedProjectId} onChange={this.handleChange}>
        <option value="-1">select</option>
        {projectsOptions}
        </FormControl>
        
        </FormGroup>
        
      <LoaderButton
        block
        bsSize="large"
        type="submit"
        isLoading={this.state.isLoading}
        text="Update"
        loadingText="Updating.."      
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
            Employee has been Updated    
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
     Unfortunately!Employee is not Updated    
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

export default employeeEdit;
