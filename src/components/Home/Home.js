import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import './Home.css';
import {Link} from 'react-router-dom';
import { Form,Alert,FormGroup,Checkbox, FormControl, ControlLabel, Button } from "react-bootstrap";

class Home extends Component {
  constructor(props){
    super(props);
    this.state={
      redirect:false,
      projects:'',
      id:'',
      project_id:'',
      project_name:'',
      employee_name:'',
      type:'',
      projectAlertCheck:true,
      employeeAlertCheck:true,      
      hideProjectTable: true
    }
    this.logout = this.logout.bind(this);
    }

  componentWillMount(){
    const {match: {params}} = this.props;
    this.state.id = params.empid;    
    fetch('http://localhost/api/projects/readprojects.php?id='+ this.state.id)
    .then((Response)=>Response.json())
    .then((findresponse)=>
  {    
    if(findresponse.message)
    {
    this.setState({projectmessage:findresponse.message, projectAlertCheck:false});
    
    }
    else{
    this.setState({
      projects:findresponse.records,
      id:findresponse.records[0].id,
      project_name:findresponse.records[0].project_name,      
      project_id:findresponse.records[0].project_id,
    
    })

    if(this.state.project_id != 14)
    {
     this.setState({ hideProjectTable:false });

    }else
    {
      this.setState({projectAlertCheck:false, projectmessage: "You're not assigned to any project" });
    }
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

  logout(){
    sessionStorage.setItem("userData",'');
    sessionStorage.clear();
    this.setState({redirect:true});
  }

  refresh(){
    window.location.reload();
  }

  render() {

    if(this.state.redirect){
      return(<Redirect to={'/'}/>)
      }
    return (
      
    <div>
     
        <div className="row small-up-2 medium-up-3 large-up-4" style={{minHeight:'440px'}}> 
     <h4 style={{float:'left'}}>Welcome! {this.state.employee_name} ({this.state.type})</h4>  
    <button type="button" className='btn btn-danger' style={{float:'right'}} onClick={this.logout}>Logout</button>
        
   <br/>
   <br/>
    <a href="/employeeSignup" className='btn btn-primary margin-bottom-1em'>Create Employee</a>    
    <a href="/createProject" className='btn btn-primary margin-bottom-1em'>Create Project</a>
    <a href="/addEmployees" className='btn btn-primary margin-bottom-1em'>Asign Employees to Projects </a>
    <a href="/allEmployees" className='btn btn-primary margin-bottom-1em'>All Employees</a>
    <a href="/allProjects" className='btn btn-primary margin-bottom-1em'>All Projects</a>
    
     
     <br/>
     <br/>
    <table className='table table-bordered table-hover' hidden={this.state.hideProjectTable}> 
                    <thead>
                     <tr>
                      <th colSpan="2" style={{background:'white',textAlign:'center'}}>My projects</th>
                        </tr>
                        <tr>
                            <th>Project Name</th>                                                     
                            <th>Actions</th>
                        </tr>
                    </thead>                    

        
                    <tbody>                  
                 
                    <tr>
            <td>{this.state.project_name}</td>  	              
                  
                     
            <td>
               
                <Link to={'/addHours/' + this.state.id +'/'+ this.state.project_id}                    
                    className='btn btn-info m-r-1em' style={{marginRight:'8px',width:'100px'}} > Add Hours
                </Link>
                <Link to={'/viewHours/' + this.state.id}                    
                    className='btn btn-info m-r-1em' style={{width:'100px'}}> View Hours
                </Link>
                
            </td>
        </tr>
                    </tbody>
                 
                </table>
                <Alert bsStyle="danger" hidden={this.state.projectAlertCheck} style={{width:'300px'}}>
            {this.state.projectmessage}
             </Alert>
                <Alert bsStyle="danger" hidden={this.state.employeeAlertCheck} style={{width:'300px'}}>
            {this.state.employeemessage}
             </Alert>
    
     
   
    
   
   
    </div>
    </div>
    );
  }
}

export default Home;
