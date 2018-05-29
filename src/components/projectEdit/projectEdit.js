import React, { Component } from 'react';
import './projectEdit.css';
import {Redirect} from 'react-router-dom'
import { PostData } from '../../services/PostData';
import  {confirmAlert} from 'react-confirm-alert';
import '../../styles/react-confirm-alert.css';
import { Modal,Button,FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from '../../components/LoaderButton/LoaderButton';

class projectEdit extends Component {

  constructor(props){
    super(props);
    this.state={
      id:'',  
      projects:[],   
      employees: [],          
      project_name:'',
      budget:'',
      redirect:false,
      selectedSupervisorId:'',
      previousSupervisorId:''
    }

   
    this.logout = this.logout.bind(this);
    this.validateProjectname = this.validateProjectname.bind(this);
    this.validateBudget = this.validateBudget.bind(this);
    this.validateSupervisor = this.validateSupervisor.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

 

  componentWillMount(){    
    const {match: {params}} = this.props;     
    this.state.id = params.empid; 

    fetch('http://localhost/api/employee/read.php')
    .then((Response)=>Response.json())
    .then((findresponse)=>
  {    
    this.setState({
      employees:findresponse.records,
    })
  })
  
fetch('http://localhost/api/projects/read_one.php?id=' + params.empid)
  .then((Response)=>Response.json())
  .then((findresponse)=>
  {        
    this.setState({
      projects:findresponse.records,      
      project_name:findresponse.records[0].project_name,   
      budget:findresponse.records[0].budget,   
      selectedSupervisorId:findresponse.records[0].supervisor_id,
      previousSupervisorId:findresponse.records[0].supervisor_id
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
    if(this.state.id && this.state.project_name && this.state.budget && this.state.selectedSupervisorId && this.state.previousSupervisorId ){
      PostData('projectEdit', this.state).then ((result)=>{
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
    if(!this.state.project_name)
    {
       this.setState({ projectnameEmpty: true});
    }
    if(!this.state.budget)
    {
      this.setState({budgetEmpty:true});
    }

    if(this.state.selectedEmployeeId == '-1')
    {
      this.setState({supervisorEmpty:true});
    }
     

    }
  
    
    
  }

  validateProjectname() {
    if(this.state.project_name.length > 0)
    {
      
    return "success";
    }
    
    if(this.state.projectnameEmpty)
    {
      return "error";
    }
  }
  
  validateBudget() {
    
    if(this.state.budget.length > 3)
    {
      
    return "success";
    }
    
    if(this.state.budgetEmpty)
    {
      return "error";
    }
  
    
  }
  
  validateSupervisor() {
    if(this.state.selectedSupervisorId != '-1')
    {
    return "success";
    }
    
    if(this.state.supervisorEmpty)
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

    if(this.state.redirect){
      return(<Redirect to={'/'}/>)
      }

    var employeesOptions = this.state.employees.map((dynamicData,key) =>{
      return(
          <option key={dynamicData.id} value={dynamicData.id}>{dynamicData.employee_name} ({dynamicData.type})</option>
      )
  })
  
      return (
        <div><div className="row small-up-2 medium-up-3 large-up-4"> 
        <h4 style={{float:'left'}}>Create Project</h4>
        <button type="button" className='btn btn-danger' style={{float:'right'}} onClick={this.logout}>Logout</button>
          
        <div className="Login">      
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="project_name" validationState={this.validateProjectname()} >
            <ControlLabel>Project Name</ControlLabel>
            <FormControl
              autoFocus              
              value={this.state.project_name}              
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="budget" validationState={this.validateBudget()}>
            <ControlLabel>Budget</ControlLabel>
            <FormControl            
              value={this.state.budget}
              onChange={this.handleChange}
              type="number"
              style={{borderRadius:'4px',height:'34px'}}
            />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="selectedSupervisorId" validationState={this.validateSupervisor()}>
          <ControlLabel>Select Supervisor</ControlLabel>
          <FormControl  componentClass="select"  value={this.state.selectedSupervisorId} onChange={this.handleChange}>
          <option value="-1">select</option>
          {employeesOptions}
          </FormControl>
          <FormControl.Feedback />
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
        Project has been Updated    
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
  Unfortunately!Project is not updated
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

export default projectEdit;
