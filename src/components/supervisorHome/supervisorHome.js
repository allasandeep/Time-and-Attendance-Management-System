import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import './supervisorHome.css';
import {Link} from 'react-router-dom';
import { Form,Alert,FormGroup,Checkbox, FormControl, ControlLabel, Button } from "react-bootstrap";
import  {confirmAlert} from 'react-confirm-alert';
import '../../styles/react-confirm-alert.css';
import { PostData } from '../../services/PostData';

class supervisorHome extends Component {
  constructor(props){
    super(props);
    this.state={      
      employees:[],
      id:'',
      redirect:false,
      rows:'',
      projects:[], 
      hideEmployeeTable: true,
      hideProjectTable: true,
      employeeAlertCheck:true,
      projectAlertCheck:true,
      reportsCheck:true
    }
    this.logout = this.logout.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
    this.deleteEmployeeAction = this.deleteEmployeeAction.bind(this);
    }

  componentWillMount(){
    const {match: {params}} = this.props;
    this.state.id = params.empid; 
    fetch('http://localhost/api/projects/reademployees.php?id='+ this.state.id)
    .then((Response)=>Response.json())
    .then((findresponse)=>
  {    
    if(findresponse.message)
    {
    this.setState({employeemessage:findresponse.message, employeeAlertCheck:false});
    
    }
    else{
    this.setState({employees:findresponse.records,  reportsCheck:false, hideEmployeeTable:false });
  }
   
    
  })
  
  fetch('http://localhost/api/projects/readSupervisorProject.php?id='+ this.state.id)
    .then((Response)=>Response.json())
    .then((findresponse)=>
  {    
    if(findresponse.message)
    {
    this.setState({projectmessage:findresponse.message, projectAlertCheck:false});
    
    }else{
    this.setState({
      projects:findresponse.records,    
      hideProjectTable:false
    })
  }
  })

  fetch('http://localhost/api/employee/readEmployeeDetails.php?id='+ this.state.id)
  .then((Response)=>Response.json())
  .then((findresponse)=>
  {
     this.setState({
      employee_name:findresponse.records[0].employee_name,
      type :findresponse.records[0].type,
      email : findresponse.records[0].email
     });
  })

 
  
    if(sessionStorage.getItem("userData")){   
      

    }
    else
    {
      this.setState({redirect:true});
    }
  }

  deleteEmployeeAction(id){
    //console.log(lname);    
   let postData = { del_id: id, type:'employees' };   
  
  if (postData) {
    PostData('removeEmployee', postData).then((result) => {      
        let responseJSON = result;        
       
    })
  }
  window.location.reload();
 
  }

  deleteEmployee = (id) => {
    confirmAlert({
      title:'',
      message: 'Are you sure, you wanna delete?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.deleteEmployeeAction(id)
        },
        {
          label: 'No',
          onClick: () => '',
        }
      ]
    })
  };

  logout(){
    sessionStorage.setItem("userData",'');
    sessionStorage.clear();
    this.setState({redirect:true});
  }

  

  render() {

   

    if(this.state.redirect){
      return(<Redirect to={'/'}/>)
      }     
      
      
    return ( 
    <div> <div className="row small-up-2 medium-up-3 large-up-4"> 
       <h4 style={{float:'left'}}>Welcome! {this.state.employee_name} ({this.state.type})</h4>  
    <button type="button" className='btn btn-danger' style={{float:'right',marginBottom:'20px'}} onClick={this.logout}>Logout</button>
    <br/><br/>
    <Link to={'/superAddEmployees/' + this.state.id }                    
                    className='btn btn-primary m-r-1em'  > Asign Employees to My Projects
                </Link>
    
 <br/><br/>
 <div hidden={this.state.hideProjectTable}>
 <table className='table table-bordered table-hover' > 
                    <thead>
                     
                        <tr>
                      <th colSpan="3" style={{background:'white',textAlign:'center'}}>My projects</th>
                        </tr>
                        <tr>
                            <th>Project Name</th>                                                   
                            <th>Actions</th>
                        </tr>
                    </thead>
        
                    {
        this.state.projects.map((dynamicData,key) =>
                    <tbody>                  
                 
                    <tr>
            <td>{dynamicData.project_name}</td>
		      	             
                  
                     
            <td>
               
            <Link to={'/addHours/' + this.state.id +'/'+ dynamicData.project_id}                    
                    className='btn btn-info m-r-1em' style={{marginRight:'8px',width:'120px'}} > Add MyHours
                </Link>
                <Link to={'/viewHours/' + this.state.id}                    
                    className='btn btn-info m-r-1em' style={{width:'120px'}}> View MyHours
                </Link>  
                
            </td>
        </tr>
                    </tbody>
        )}
                </table>
                <br/>
                <br/>
                </div>
                <Alert bsStyle="danger" hidden={this.state.projectAlertCheck} style={{width:'300px'}}>
            {this.state.projectmessage}
             </Alert>
                <Alert bsStyle="danger" hidden={this.state.employeeAlertCheck} style={{width:'300px'}}>
            {this.state.employeemessage}
             </Alert>
 <table className='table table-bordered table-hover' hidden={this.state.hideEmployeeTable}> 
                    <thead>                      
                        <tr>
                      <th colSpan="5" style={{background:'white',textAlign:'center'}}>Employees working in your team</th>
                        </tr>
                        <tr>
                            <th>Project Name</th>
                            <th>Employee Name</th>
                            <th>Job Title</th>
                            <th>Salary</th>                         
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {
        this.state.employees.map((dynamicData,key) =>
        
                    <tbody>                  
                 
                    <tr>
            <td>{dynamicData.project_name}</td>
		      	<td>{dynamicData.employee_name}</td>              
            <td>{dynamicData.position}</td>
		      	<td>{dynamicData.salary}</td>     
                     
            <td>
               
                <Link to={'/employeeEdit/' + dynamicData.id}                    
                    className='btn btn-info m-r-1em' style={{marginRight:'8px',width:'100px'}}> Edit
                </Link>                
                <Link to={'/viewHoursSuper/' + dynamicData.id}                    
                    className='btn btn-info m-r-1em' style={{marginRight:'8px',width:'100px'}}> View Hours
                </Link>
                <button type="button" className='btn btn-danger' style={{width:'100px'}} onClick={() =>{this.deleteEmployee(dynamicData.id)}}>Remove</button>
            </td>
        </tr>
                    </tbody>
       )}
                </table>
                <Link to={'/detailedReport/' + this.state.id}   hidden={this.state.reportsCheck}                 
                    className='btn btn-primary m-r-1em' > Detailed Report   </Link>
                <Link to={'/summaryReport/' + this.state.id}    hidden={this.state.reportsCheck}                
                    className='btn btn-primary m-r-1em' > Summary Report   </Link>
                <Link to={'/hoursReport/' + this.state.id}          hidden={this.state.reportsCheck}          
                    className='btn btn-primary m-r-1em' > Hours Report   </Link>      
   
      
    </div></div>
    );
 
  }
}

export default supervisorHome;
