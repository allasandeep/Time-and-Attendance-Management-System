import React, { Component } from 'react';
import './createProject.css';
import {Redirect} from 'react-router-dom'
import { PostData } from '../../services/PostData';
import  {confirmAlert} from 'react-confirm-alert';
import '../../styles/react-confirm-alert.css';
import { Alert,Modal,Button,FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from '../../components/LoaderButton/LoaderButton';


class createProject extends Component {

  constructor(props){
    super(props);
    this.state={
      employees: [],       
      selectedEmployeeId: -1, 
      projectname:'',  
      budget:'',   
      redirect:false,
      hideForm:true,
      employeeAlertCheck:true
      
    }
    
    this.validateProjectname = this.validateProjectname.bind(this);
    this.validatebudget = this.validatebudget.bind(this);
    this.validateSupervisor = this.validateSupervisor.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.logout = this.logout.bind(this);
    
  }

 

  componentWillMount(){
    fetch('http://localhost/api/employee/read.php')
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
  if(this.state.projectname && this.state.selectedEmployeeId != '-1' && this.state.budget){
    PostData('createproject', this.state).then ((result)=>{
      let responseJSON = result;   

     /* if(responseJSON.typeMessage)
      {
       this.setState({isLoading:false, consentModel:true,consentMessage:responseJSON.typeMessage});
      }*/

      if(responseJSON.successMessage){
                  
        this.setState({isLoading: false, modelCreated:true});
        
    }
    else if(responseJSON.errorMessage){
     
      this.setState({ isLoading: false,modelNotcreated: true , errorMessage:responseJSON.errorMessage });
    }
      
    })
   
  }
  else
  {
    this.setState({ isLoading: false });
    if(!this.state.projectname)
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
  if(this.state.projectname.length > 0)
  {
    
  return "success";
  }
  
  if(this.state.projectnameEmpty)
  {
    return "error";
  }
}

validatebudget() {
  
  if(this.state.budget.length > 0)
  {
    
  return "success";
  }
  
  if(this.state.budgetEmpty)
  {
    return "error";
  }

  
}

validateSupervisor() {
  if(this.state.selectedEmployeeId != '-1')
  {
  return "success";
  }
  
  if(this.state.supervisorEmpty)
  {
    return "error";
  }
  
}

handleHide() {
  this.setState({ modelCreated: false, modelNotcreated:false, consentModel:false });

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
     <br/>
     <br/>
      <Alert bsStyle="danger" hidden={this.state.employeeAlertCheck} style={{width:'300px'}}>
            {this.state.employeemessage}
             </Alert>
      <div className="Login" hidden= {this.state.hideForm}>      
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="projectname" validationState={this.validateProjectname()} >
          <ControlLabel>Project Name</ControlLabel>
          <FormControl
            autoFocus              
            value={this.state.projectname}              
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup controlId="budget" validationState={this.validatebudget()}>
          <ControlLabel>Budget</ControlLabel>
          <FormControl            
            value={this.state.budget}
            onChange={this.handleChange}
            type="number"
            style={{borderRadius:'4px',height:'34px'}}
          />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup controlId="selectedEmployeeId" validationState={this.validateSupervisor()}>
        <ControlLabel>Select Supervisor</ControlLabel>
        <FormControl  componentClass="select"  value={this.state.selectedEmployeeId} onChange={this.handleChange}>
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
          text="Create"
          loadingText="Creating.."      
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
      Project has been Created    
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

export default createProject;
