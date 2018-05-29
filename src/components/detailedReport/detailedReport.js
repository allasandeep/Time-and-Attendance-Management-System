import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { Form,Alert,FormGroup,Checkbox, FormControl, ControlLabel, Button } from "react-bootstrap";
import './detailedReport.css';
import {Link} from 'react-router-dom';



class detailedReport extends Component {
  constructor(props){
    super(props);
    this.state={
      redirect:false,
      timesheets:[],
      id:'',    
      hideEmployeeTable:true,
     employeeAlertCheck:true
    }
    
    }

  componentWillMount(){
    const {match: {params}} = this.props;
    this.state.id = params.empid;    
    fetch('http://localhost/api/hours/read.php?id='+ this.state.id)
    .then((Response)=>Response.json())
    .then((findresponse)=>
  {    
    if(findresponse.message)
    {
    this.setState({employeemessage:findresponse.message, employeeAlertCheck:false});
    }else{
    this.setState({
      timesheets:findresponse.records, hideEmployeeTable:false
    })
  }
  })  

    if(sessionStorage.getItem("userData")){
    
    }
    else
    {
      this.setState({redirect:true});
    }
  }
  

  render() {
    

    
    return (
      
    <div>
     
        <div className="row small-up-2 medium-up-3 large-up-4">       
        
        <Alert bsStyle="danger" hidden={this.state.employeeAlertCheck} style={{width:'300px'}}>
            {this.state.employeemessage}
             </Alert>
          
    <table className='table table-bordered table-hover' hidden={this.state.hideEmployeeTable}> 
                    <thead>
                     <tr>
                      <th colSpan="8" style={{background:'white',textAlign:'center'}}>Detailed Report</th>
                        </tr>
                        <tr>
                           <th>Employee ID</th>
                            <th>Project Name</th>                                                     
                            <th>Employee Name</th>                                                                 
                                                                                                     
                            <th>Supervisor Name</th>
                            <th>Position</th>
                            <th>Work Date </th>
                              <th>Worked From</th>
                            <th>Worked To</th>
                        </tr>
                    </thead>                    

        {
        this.state.timesheets.map((dynamicData,key) =>
                    <tbody>                  
                 
                    <tr>
            <td>{dynamicData.employee_id}</td>  	              
            <td>{dynamicData.project_name}</td>      
            <td>{dynamicData.employee_name}</td>
            <td>{dynamicData.supervisor_name}</td>
            <td>{dynamicData.position}</td> 
            <td>{dynamicData.work_date}</td> 
            <td>{dynamicData.worked_from}</td> 
            <td>{dynamicData.worked_to}</td> 
                       
                
                
           

        </tr>
                    </tbody>
        )}
                </table>
              
    
     
   
    
   
   
    </div>
    </div>
    );
  }
}

export default detailedReport;
