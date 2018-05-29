import React, { Component } from 'react';
//import {Redirect} from 'react-router-dom'
import './ReadEmployees.css';
import {Redirect} from 'react-router-dom'
import  {confirmAlert} from 'react-confirm-alert';
import '../../../styles/react-confirm-alert.css';
import { PostData } from '../../../services/PostData';
import {Link} from 'react-router-dom';
import { Form,Alert,FormGroup,Checkbox, FormControl, ControlLabel, Button } from "react-bootstrap";

class ReadEmployees extends Component { 
 
  constructor(props){
    super(props);
    this.state={
        employees:[],
        redirect:false,
        hideEmployeeTable: true,
        employeeAlertCheck:true,
    };   

    this.logout = this.logout.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
  this.deleteEmployeeAction = this.deleteEmployeeAction.bind(this);
  
  }

  componentDidMount(){
    fetch('http://localhost/api/employee/read.php')
    .then((Response)=>Response.json())
    .then((findresponse)=>
  {    
    if(findresponse.message)
    {
    this.setState({employeemessage:findresponse.message, employeeAlertCheck:false});
    }else{
    this.setState({
      employees:findresponse.records, hideEmployeeTable:false
    })
  }
  })

  
  }

 deleteEmployeeAction(id){
    //console.log(lname);    
   let postData = { del_id: id, type:'employees' };   
  
  if (postData) {
    PostData('deleteop', postData).then((result) => {      
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
          
      <div>
        <br/>
        <div className="row small-up-2 medium-up-3 large-up-4"> 
     <h4 style={{float:'left'}}>All Employees</h4>  
    <button type="button" className='btn btn-danger' style={{float:'right'}} onClick={this.logout}>Logout</button>
       <br/>
       <br/>
        <Alert bsStyle="danger" hidden={this.state.employeeAlertCheck} style={{width:'300px'}}>
            {this.state.employeemessage}
             </Alert>
                <table className='table table-bordered table-hover'  hidden={this.state.hideEmployeeTable}>
                    <thead>
                    <tr>
                      <th colSpan="8" style={{background:'white',textAlign:'center'}}>All Employees</th>
                        </tr>
                        <tr>
                            <th>First Name</th>
						              	<th>Last Name</th>
                            <th>E-Mail</th>
                            <th>Position</th>
                            <th>Salary</th>
                            <th>Project</th>
                            <th>Type </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {
        this.state.employees.map((dynamicData,key) =>
                    <tbody>                  
                 
                    <tr>
                    
            <td>{dynamicData.fname}</td>
		      	<td>{dynamicData.lname}</td>
            <td>{dynamicData.email}</td>            
            <td>{dynamicData.position}</td>
            <td>${parseFloat(dynamicData.salary).toFixed(2)} /Year</td>
            <td>{dynamicData.project_name}</td> 
            <td>{dynamicData.type}</td>          
                     
            <td>
               
                <Link to={'/employeeEdit/' + dynamicData.id}                    
                    className='btn btn-info m-r-1em' style={{marginRight:'8px',width:'75px'}} > Edit
                </Link>
                <button type="button" className='btn btn-danger' style={{width:'75px'}} onClick={() =>{this.deleteEmployee(dynamicData.id)}}>Delete</button>
            </td>
        </tr>
                    </tbody>
                    )}
                </table>
        
                </div>
      </div>
  
    );
  }
}

export default ReadEmployees;
