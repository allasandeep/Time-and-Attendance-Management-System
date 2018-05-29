import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import './employeeHome.css';
import {Link} from 'react-router-dom';
import { Form,Alert,FormGroup,Checkbox, FormControl, ControlLabel, Button } from "react-bootstrap";


class employeeHome extends Component {
  constructor(props){
    super(props);
    this.state={ 
      id:'',     
      projects:[],
      project_id:'',
      project_name:'',
      employee_name:'',
      redirect:false,
      hideProjectTable: true,
      projectAlertCheck:true
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
    this.setState({projectmessage:findresponse.message, projectAlertCheck:false  });
    
    }
    else{
    this.setState({
      project_id: findresponse.records[0].project_id,
      projects:findresponse.records
    })
    if(this.state.project_id != 14)
    {
      this.setState({hideProjectTable:false});
    }
    else{
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

  render() {

    if(this.state.redirect){
      return(<Redirect to={'/'}/>)
      }

    return (
     
    <div> <div className="row small-up-2 medium-up-3 large-up-4"> 
    <h4 style={{float:'left'}}>Welcome! {this.state.employee_name} ({this.state.type})</h4>  
    <button type="button" className='btn btn-danger' style={{float:'right',marginBottom:'20px'}} onClick={this.logout}>Logout</button>
     <br/>
     <br/>   
    <Alert bsStyle="danger" hidden={this.state.projectAlertCheck} style={{width:'300px'}}>
            {this.state.projectmessage}
             </Alert>
 <table className='table table-bordered table-hover' hidden={this.state.hideProjectTable}> 
                    <thead>
                     
                        <tr>
                      <th colSpan="3" style={{background:'white',textAlign:'center'}}>My projects</th>
                        </tr>
                        <tr>
                            <th>Project Name</th>
                            <th>Supervisor Name</th>                         
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {
        this.state.projects.map((dynamicData,key) =>
        
                    <tbody>                  
                 
                    <tr>
            <td>{dynamicData.project_name}</td>
		      	<td>{dynamicData.supervisor_name}</td>              
                  
                     
            <td>
               
                <Link to={'/addHours/' + dynamicData.id +'/'+ dynamicData.project_id}                    
                    className='btn btn-info m-r-1em' style={{marginRight:'8px',width:'100px'}} > Add Hours
                </Link>
                <Link to={'/viewHours/' + dynamicData.id}                    
                    className='btn btn-info m-r-1em' style={{width:'100px'}}> View Hours
                </Link>
                
            </td>
        </tr>
                    </tbody>
      )}
                </table>
              
    

    
    </div></div>
    );
  }
}

export default employeeHome;
