import React, { Component } from 'react';
import './hoursEdit.css';
import {Redirect} from 'react-router-dom'
import { PostData } from '../../services/PostData';
import  {confirmAlert} from 'react-confirm-alert';
import '../../styles/react-confirm-alert.css';
import { Alert,Modal,Button,FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from '../../components/LoaderButton/LoaderButton';
import {Link} from 'react-router-dom';
import moment from 'moment';

class hoursEdit extends Component {

  constructor(props){
    super(props);
    this.state={
      id:'',  
      today: moment(),
      timefrom:'',
      timeto:'',
      workdate:'',
      hoursAlert:true,
      readHoursAlert:true,
      hideHourTable:true,
      employeehours:[],
      dateAlert:true,
      difference:'',
      differenceAlert:true
    }

   
    
    this.logout = this.logout.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateTimefrom = this.validateTimefrom.bind(this);
    this.validateTimeto = this.validateTimeto.bind(this);
    this.validateWorkdate= this.validateWorkdate.bind(this);
  }

 

  componentWillMount(){    
    const {match: {params}} = this.props;     
    this.state.id = params.empid; 
    fetch('http://localhost/api/hours/read_one.php?id='+ this.state.id)
    .then((Response)=>Response.json())
    .then((findresponse)=>
  {    
    if(findresponse.message)
    {
    this.setState({hourmessage:findresponse.message, readHoursAlert:false});
    
    }
    else{
    this.setState({employeehours:findresponse.records,workdate:findresponse.records[0].workdate,timefrom:findresponse.records[0].timefrom,timeto:findresponse.records[0].timeto, hideHourTable:false });

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
    
    
    if(this.state.workdate && this.state.timefrom && this.state.timeto && this.state.id ){
      
      if((this.state.timeto > this.state.timefrom) && (this.state.workdate <= this.state.today.format("Y-MM-D")) && (this.state.difference <= 14) ){
      PostData('hoursEdit', this.state).then ((result)=>{
        let responseJSON = result;
        
        if(responseJSON.successMessage){
          this.setState({isLoading: false, modelCreated:true, hoursAlert:true,dateAlert:true,differenceAlert:true});
        
        }
        else if(responseJSON.message){
         
          this.setState({ isLoading: false,modelNotcreated: true , differenceAlert:true, hoursAlert:true,dateAlert:true,errorMessage:responseJSON.message });
        }
        
       
      })
      
    }
    else{
      this.setState({isLoading:false});
      if(this.state.timeto <= this.state.timefrom)
      this.setState({hoursAlert:false,timetoEmpty:true});

      if(this.state.workdate > this.state.today.format("Y-MM-D"))
      this.setState({dateAlert:false,workdateEmpty:true,differenceAlert:true});

      if((this.state.difference > 14))
      this.setState({differenceAlert:false,workdateEmpty:true,dateAlert:true});
    }
  }
    else
    {
      this.setState({ isLoading: false });
    if(!this.state.workdate)
    {
       this.setState({ workdateEmpty: true});
    }
    if(!this.state.timefrom)
    {
      this.setState({timefromEmpty:true});
    }

    if(!this.state.timeto)
    {
      this.setState({timetoEmpty:true});
    }
     

    }
  
    
    
  }

  validateWorkdate() {
    var today = moment();
    var end = this.state.workdate;
    var difference = today.diff(end, 'days');
    this.state.difference = difference;    
    if(this.state.workdate <= this.state.today.format("Y-MM-D") && (difference <= 14))
    {      
    return "success";
    }else{
      return "error";
    }
  
    
    if(this.state.workdateEmpty)
    {
      return "error";
    }
  }
  
  validateTimefrom() {
    
    if(this.state.timefrom)
    {      
    return "success";
    }
    
    if(this.state.timefromEmpty)
    {
      return "error";
    }
  
    
  }
  
  validateTimeto() {
    if(this.state.timeto > this.state.timefrom)
    {
    return "success";
    }else{
      return "error";
    }
    
    
    if(this.state.timetoEmpty)
    {
      return "error";
    }
    
  }




  logout(){
    sessionStorage.setItem("userData",'');
    sessionStorage.clear();
    this.setState({redirect:true});
  }
  
  handleHide() {
    this.setState({ modelCreated: false, modelNotcreated:false });
  }

  render() { 
    if(this.state.redirect){
      return(<Redirect to={'/'}/>)
      }
   
    return(
    <div><div className="row small-up-2 medium-up-3 large-up-4"> 
        <h4 style={{float:'left'}}>Edit Hours</h4>
        <button type="button" className='btn btn-danger' style={{float:'right', width:'100px'}} onClick={this.logout}>Logout</button>
        
        
      <div className="Login">      
      <form onSubmit={this.handleSubmit} hidden={this.state.hideHourTable}>  
      <FormGroup controlId="workdate"  validationState={this.validateWorkdate()}>
        <ControlLabel>Select Date</ControlLabel>
        <FormControl  
          style={{borderRadius:'6px'}}
          autoFocus          
          value={this.state.workdate}
          onChange={this.handleChange}
          type="date"
          disabled={true}
        />
        <FormControl.Feedback />
      </FormGroup>
        <FormGroup controlId="timefrom" validationState={this.validateTimefrom()} >
        <ControlLabel>Select From</ControlLabel>
        <FormControl  componentClass="select"  value={this.state.timefrom} onChange={this.handleChange} >
      <option value ="1">select</option>  
     <option value="06:00:00">06:00</option>
     <option value="06:15:00">06:15</option>
     <option value="06:30:00">06:30</option>
     <option value="06:45:00">06:45</option>
     <option value="07:00:00">07:00</option>
     <option value="07:15:00">07:15</option>
     <option value="07:30:00">07:30</option>
     <option value="07:45:00">07:45</option>
     <option value="08:00:00">08:00</option>
     <option value="08:15:00">08:15</option>
     <option value="08:30:00">08:30</option>
     <option value="08:45:00">08:45</option>
     <option value="09:00:00">09:00</option>
     <option value="09:15:00">09:15</option>
     <option value="09:30:00">09:30</option>
     <option value="09:45:00">09:45</option>
     <option value="10:00:00">10:00</option>
     <option value="10:15:00">10:15</option>
     <option value="10:30:00">10:30</option>
     <option value="10:45:00">10:45</option>
     <option value="11:00:00">11:00</option>
     <option value="11:15:00">11:15</option>
     <option value="11:30:00">11:30</option>
     <option value="11:45:00">11:45</option>
     <option value="12:00:00">12:00</option>
     <option value="12:15:00">12:15</option>
     <option value="12:30:00">12:30</option>
     <option value="12:45:00">12:45</option>
     <option value="13:00:00">13:00</option>
     <option value="13:15:00">13:15</option>
     <option value="13:30:00">13:30</option>
     <option value="13:45:00">13:45</option>
     <option value="14:00:00">14:00</option>
     <option value="14:15:00">14:15</option>
     <option value="14:30:00">14:30</option>
     <option value="14:45:00">14:45</option>
     <option value="15:00:00">15:00</option>
     <option value="15:15:00">15:15</option>
     <option value="15:30:00">15:30</option>
     <option value="15:45:00">15:45</option>
     <option value="16:00:00">16:00</option>
     <option value="16:15:00">16:15</option>
     <option value="16:30:00">16:30</option>
     <option value="16:45:00">16:45</option>
     <option value="17:00:00">17:00</option>
     <option value="17:15:00">17:15</option>
     <option value="17:30:00">17:30</option>
     <option value="17:45:00">17:45</option>
     <option value="18:00:00">18:00</option>  
    
        </FormControl>
        <FormControl.Feedback />
        </FormGroup>      
        <FormGroup controlId="timeto"  validationState={this.validateTimeto()}>
        <ControlLabel>Select To</ControlLabel>
        <FormControl  componentClass="select"  value={this.state.timeto} onChange={this.handleChange}>
        <option value ="2">select</option>  
     <option value="06:00:00">06:00</option>
     <option value="06:15:00">06:15</option>
     <option value="06:30:00">06:30</option>
     <option value="06:45:00">06:45</option>
     <option value="07:00:00">07:00</option>
     <option value="07:15:00">07:15</option>
     <option value="07:30:00">07:30</option>
     <option value="07:45:00">07:45</option>
     <option value="08:00:00">08:00</option>
     <option value="08:15:00">08:15</option>
     <option value="08:30:00">08:30</option>
     <option value="08:45:00">08:45</option>
     <option value="09:00:00">09:00</option>
     <option value="09:15:00">09:15</option>
     <option value="09:30:00">09:30</option>
     <option value="09:45:00">09:45</option>
     <option value="10:00:00">10:00</option>
     <option value="10:15:00">10:15</option>
     <option value="10:30:00">10:30</option>
     <option value="10:45:00">10:45</option>
     <option value="11:00:00">11:00</option>
     <option value="11:15:00">11:15</option>
     <option value="11:30:00">11:30</option>
     <option value="11:45:00">11:45</option>
     <option value="12:00:00">12:00</option>
     <option value="12:15:00">12:15</option>
     <option value="12:30:00">12:30</option>
     <option value="12:45:00">12:45</option>
     <option value="13:00:00">13:00</option>
     <option value="13:15:00">13:15</option>
     <option value="13:30:00">13:30</option>
     <option value="13:45:00">13:45</option>
     <option value="14:00:00">14:00</option>
     <option value="14:15:00">14:15</option>
     <option value="14:30:00">14:30</option>
     <option value="14:45:00">14:45</option>
     <option value="15:00:00">15:00</option>
     <option value="15:15:00">15:15</option>
     <option value="15:30:00">15:30</option>
     <option value="15:45:00">15:45</option>
     <option value="16:00:00">16:00</option>
     <option value="16:15:00">16:15</option>
     <option value="16:30:00">16:30</option>
     <option value="16:45:00">16:45</option>
     <option value="17:00:00">17:00</option>
     <option value="17:15:00">17:15</option>
     <option value="17:30:00">17:30</option>
     <option value="17:45:00">17:45</option>
     <option value="18:00:00">18:00</option>     
     
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
        <br/>
        <Alert bsStyle="danger" hidden={this.state.hoursAlert}>
            The worked to time must be greater than the worked from time .
             </Alert>
             <Alert bsStyle="danger" hidden={this.state.readHoursAlert}>
            Hour Not Found.
             </Alert>
             <Alert bsStyle="danger" hidden={this.state.dateAlert}>
            You cannot select a future date
             </Alert>
             <Alert bsStyle="danger" hidden={this.state.differenceAlert}>
            You cannot add a timesheet which is 2 weeks old
             </Alert>
          
        
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
        Timesheet has been Updated    
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
  Unfortunately!Timesheet is not updated
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

export default hoursEdit;
