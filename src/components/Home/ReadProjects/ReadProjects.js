import React, { Component } from 'react';
//import {Redirect} from 'react-router-dom'
import './ReadProjects.css';
import {Redirect} from 'react-router-dom'
import  {confirmAlert} from 'react-confirm-alert';
import '../../../styles/react-confirm-alert.css';
import { PostData } from '../../../services/PostData';
import {Link} from 'react-router-dom';
import { Modal, Form,Alert,FormGroup,Checkbox, FormControl, ControlLabel, Button } from "react-bootstrap";

class ReadProjects extends Component { 
 
  constructor(props){
    super(props);
    this.state={
        projects:[],
        redirect:false,
        hideProjectsTable: true,
        projectAlertCheck:true,
        
    };   
    this.logout = this.logout.bind(this);
    this.deleteSupervisor = this.deleteSupervisor.bind(this);
  this.deleteSupervisorAction = this.deleteSupervisorAction.bind(this);
  }

  componentDidMount(){
    fetch('http://localhost/api/projects/read.php')
    .then((Response)=>Response.json())
    .then((findresponse)=>
  {    
    if(findresponse.message)
    {
    this.setState({projectmessage:findresponse.message, projectAlertCheck:false});
    }else{
    this.setState({
      projects:findresponse.records, hideProjectsTable:false
    })
  }
  })

  
  }

 deleteSupervisorAction(id){
   
    //console.log(lname);    
   let postData = { del_id: id , type : 'projects'};   
  console.log(postData);
  if (postData) {
    PostData('projectdeleteop', postData).then((result) => {      
        let responseJSON = result;        
       
    })
  }
 
  window.location.reload();
  }

  deleteSupervisor = (id) => {      
  
    confirmAlert({
      title:'',
      message: 'If you delete this project all the employees working under this project will be assigned to none, Are you sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.deleteSupervisorAction(id)
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
        <div className="row small-up-2 medium-up-3 large-up-4"> 
     <h4 style={{float:'left'}}>All Projects</h4>  
    <button type="button" className='btn btn-danger' style={{float:'right'}} onClick={this.logout}>Logout</button>
    <br/>
    <br/>
    <Alert bsStyle="danger" hidden={this.state.projectAlertCheck} style={{width:'300px'}}>
            {this.state.projectmessage}
             </Alert>
                <table className='table table-bordered table-hover' hidden={this.state.hideProjectsTable}>
                    <thead>
                    <tr>
                      <th colSpan="4" style={{background:'white',textAlign:'center'}}>All Projects</th>
                        </tr>
                        <tr>
                            <th>Project Name</th>
						              	<th>Supervisor Name</th>
                            <th>Budget</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {
        this.state.projects.map((dynamicData,key) =>
                    <tbody>                  
                 
                    <tr>
                    
            <td>{dynamicData.name}</td>
		      	<td>{dynamicData.supervisor_name}</td>            
            <td>{dynamicData.budget}</td>
                     
            <td>
               
                <Link to={'/projectEdit/' + dynamicData.id}                    
                    className='btn btn-info m-r-1em' style={{marginRight:'8px',width:'75px'}} > Edit
                </Link>
                <button type="button" className='btn btn-danger'  style={{width:'75px'}} onClick={() =>{this.deleteSupervisor(dynamicData.id)}}>Delete</button>
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

export default ReadProjects;
