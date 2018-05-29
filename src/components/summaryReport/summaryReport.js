import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { Form,Alert,FormGroup,Checkbox, FormControl, ControlLabel, Button } from "react-bootstrap";
import './summaryReport.css';
import {Link} from 'react-router-dom';
import { PostData } from '../../services/PostData';
import  {confirmAlert} from 'react-confirm-alert';


class summaryReport extends Component {
  constructor(props){
    super(props);
    this.state={
      redirect:false,
      timesheets:[],
      id:'', 
      fromdate:'',
      todate:'',  
      timesheetHidden:true,
      fieldsEmpty:true,
      salaryCheck:false,
      positionCheck:false,
      supervisorCheck:false,
      checked:true,
      generateBtnCheck:false,
     newDatesBtnCheck:true,
     hideEmployeeTable:true,
     employeeAlertCheck:true,
     MonthfieldsEmpty:true,
     month:'',
     year:''
     
    }
    this.reloadSelection = this.reloadSelection.bind(this);
    this.handleCheckPosition = this.handleCheckPosition.bind(this);
    this.handleCheckSalary = this.handleCheckSalary.bind(this);
    this.handleCheckSupervisor = this.handleCheckSupervisor.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMonthSubmit = this.handleMonthSubmit.bind(this);
    
    }

  componentWillMount(){
    const {match: {params}} = this.props;
    this.state.id = params.empid;    
     

    if(sessionStorage.getItem("userData")){
    
    }
    else
    {
      this.setState({redirect:true});
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    this.setState({ isLoading: true });
    event.preventDefault();
    if(this.state.id && this.state.fromdate && this.state.todate)
    {
     
    PostData('readHoursBetween', this.state).then ((result)=>{
      let responseJSON = result;
      if(responseJSON.records){
        sessionStorage.setItem('records',responseJSON);
        this.setState({timesheets:responseJSON.records});
        this.setState({timesheetHidden:false,generateBtnCheck:true,employeeAlertCheck:true,newDatesBtnCheck:false,fieldsEmpty:true,hideEmployeeTable:false});    
          
      }else if(responseJSON.message)
      {
      this.setState({employeemessage:responseJSON.message, employeeAlertCheck:false});
      }

    })
  
  }
  else{
    this.setState({fieldsEmpty:false});
  }
  
  }

  handleMonthSubmit = event => {
    this.setState({ isLoading: true });
    event.preventDefault();
    if(this.state.id  && this.state.month && this.state.year)
    {
     
    PostData('readHoursMonthly', this.state).then ((result)=>{
      let responseJSON = result;
      if(responseJSON.records){
        sessionStorage.setItem('records',responseJSON);
        this.setState({timesheets:responseJSON.records});
        this.setState({timesheetHidden:false,generateBtnCheck:true,employeeAlertCheck:true,newDatesBtnCheck:false,fieldsEmpty:true,hideEmployeeTable:false});    
          
      }else if(responseJSON.message)
      {
      this.setState({employeemessage:responseJSON.message, employeeAlertCheck:false});
      }

    })
  
  }
  else{
    this.setState({MonthfieldsEmpty:false});
  }
  
  }


  reloadSelection(){
    window.location.reload();
    
  }

  handleCheckPosition(){

    this.setState({positionCheck:!this.state.positionCheck,checked:!this.state.checked});
  }

  handleCheckSalary(){
    this.setState({salaryCheck:!this.state.salaryCheck,checked:!this.state.checked});
  }

  handleCheckSupervisor(){
    this.setState({supervisorCheck:!this.state.supervisorCheck,checked:!this.state.checked});
  }
  
 

  render() {  
    return (
      
    <div>
      
     
        <div className="row small-up-2 medium-up-3 large-up-4" >   
        <Form inline onSubmit={this.handleMonthSubmit} >
        <FormGroup controlId="month" >
        <ControlLabel>Select a Month</ControlLabel>
        <FormControl  componentClass="select" style={{borderRadius:'6px',height:'2.4375rem'}} value={this.state.month} onChange={this.handleChange}>
        <option value="">Month</option> 
     <option value="01">January</option>
     <option value="02">February</option>
     <option value="03">March</option>
     <option value="04">April</option>
     <option value="05">May</option>
     <option value="06">June</option>
     <option value="07">July</option>
     <option value="08">August</option>
     <option value="09">September</option>
     <option value="10">October</option>
     <option value="11">November</option>
     <option value="12">December</option>
   
   
        </FormControl>
        </FormGroup>      {' '}
        <FormGroup controlId="year" >
        <ControlLabel>& Year</ControlLabel>
        <FormControl  componentClass="select" style={{borderRadius:'6px',height:'2.4375rem'}} value={this.state.year} onChange={this.handleChange}>
        <option value="">Year</option> 
        <option value="2018">2018</option>
        <option value="2017">2017</option>
        <option value="2016">2016</option>
     <option value="2015">2015</option>
     
     
     
     
   
   
        </FormControl>
        </FormGroup>      {' '}
             
        <Button type="submit" bsStyle="primary" hidden={this.state.generateBtnCheck} style={{height:'2.4375rem', marginTop:'8px'}}>Generate</Button>
        <Button type="button" bsStyle="primary" hidden={this.state.newDatesBtnCheck} onClick={this.reloadSelection} style={{height:'2.4375rem', marginTop:'8px'}}>Change Dates</Button>
        
        <Alert bsStyle="danger" hidden={this.state.MonthfieldsEmpty} style={{width:'250px'}}>
            Select a Month.
             </Alert>
             </Form>
             
    
        <Form inline onSubmit={this.handleSubmit} >
      <FormGroup controlId="fromdate" >
        <ControlLabel>From Date</ControlLabel>{' '}
        <FormControl  
          style={{borderRadius:'6px'}}
          autoFocus          
          value={this.state.fromdate}
          onChange={this.handleChange}
          type="date"
        />
        </FormGroup>{'  '}
        <FormGroup controlId="todate" >
        <ControlLabel>To Date</ControlLabel>
        <FormControl  
          style={{borderRadius:'6px'}}                  
          value={this.state.todate}
          onChange={this.handleChange}
          type="date"
        />
        </FormGroup>{'  '}       
          
        <Button type="submit" bsStyle="primary" hidden={this.state.generateBtnCheck} style={{height:'2.4375rem', marginTop:'8px'}}>Generate</Button>
        <Button type="button" bsStyle="primary" hidden={this.state.newDatesBtnCheck} onClick={this.reloadSelection} style={{height:'2.4375rem', marginTop:'8px'}}>Change Dates</Button>
        
        <Alert bsStyle="danger" hidden={this.state.fieldsEmpty} style={{width:'250px'}}>
            Select from and to date.
             </Alert>
        
        
        
         <h6>Check the fields you want to see in the report</h6>     
         <Checkbox defaultChecked={this.state.checked}  onChange={this.handleCheckPosition}>Position </Checkbox>{'  '}
         <Checkbox defaultChecked={this.state.checked}  onChange={this.handleCheckSalary}>Salary </Checkbox>{'  '}
         <Checkbox defaultChecked={this.state.checked}  onChange={this.handleCheckSupervisor}>supervisor_name </Checkbox>
         
             </Form>
             <br/>
          
     </div>
    
     <div className="row small-up-2 medium-up-3 large-up-4" id="printableArea" > 
     <Alert bsStyle="danger" hidden={this.state.employeeAlertCheck} style={{width:'300px'}}>
            {this.state.employeemessage}
             </Alert>
   <div hidden={this.state.timesheetHidden}>
   
   <table className='table table-bordered table-hover' hidden={this.state.hideEmployeeTable}> 
                    <thead>
                     <tr>
                      <th colSpan="10" style={{background:'white',textAlign:'center'}}>Detailed Report</th>
                        </tr>
                        <tr>
                           <th>Employee ID</th>
                            <th>Project Name</th>                                                     
                            <th>Employee Name</th>                                                            
                                                                                                     
                            <th hidden={this.state.supervisorCheck}>Supervisor Name</th>
                            <th hidden={this.state.positionCheck}>Position</th>
                            <th hidden={this.state.salaryCheck}>Salary</th>
                            <th>Work Date </th>
                            <th>Worked From</th>
                            <th>Worked To</th>
                            <th>Hours Worked</th>
                        </tr>
                    </thead>                    

        {
        this.state.timesheets.map((dynamicData,key) =>
                    <tbody>                  
                 
                    <tr>
            <td>{dynamicData.employee_id}</td>  	              
            <td>{dynamicData.project_name}</td>      
            <td>{dynamicData.employee_name}</td>
            <td hidden={this.state.supervisorCheck}>{dynamicData.supervisor_name}</td>
            <td hidden={this.state.positionCheck}>{dynamicData.position}</td> 
            <td hidden={this.state.salaryCheck}>{dynamicData.salary}</td>
            <td>{dynamicData.work_date}</td> 
            <td>{dynamicData.worked_from}</td> 
            <td>{dynamicData.worked_to}</td> 
            <td>{dynamicData.total_hours}</td>
                       
                
                
           

        </tr>
                    </tbody>
        )}
                </table>
   </div>
    </div>
   
   
    
    </div>
    );
  }
}

export default summaryReport;
