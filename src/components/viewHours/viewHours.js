import React, { Component } from 'react';
import './viewHours.css';
import {Redirect} from 'react-router-dom'
import { PostData } from '../../services/PostData';
import  {confirmAlert} from 'react-confirm-alert';
import '../../styles/react-confirm-alert.css';
import {Link} from 'react-router-dom';
import { Modal,Form,Alert,FormGroup,Checkbox, FormControl, ControlLabel, Button } from "react-bootstrap";
import moment from 'moment';

class viewHours extends Component {

  constructor(props){
    super(props);
    this.state={
      id:'',
      hour_id:'',
      employeeprojects:[],     
      redirect:false,
      hideHourTable: true,
      hoursAlertCheck:true,
      modelCreated:false,
      modelNotcreated:false,
      diffModel:false,
      hoursEdit:false
    }

    this.logout = this.logout.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleHide = this.handleHide.bind(this);    
    this.deleteHour = this.deleteHour.bind(this);
    this.deleteHourAction = this.deleteHourAction.bind(this);
    this.hoursEdit = this.hoursEdit.bind(this);
  }

 

  componentWillMount(){
    const {match: {params}} = this.props;
    this.state.id = params.empid; 
    fetch('http://localhost/api/projects/reademployeehours.php?id='+ this.state.id)
    .then((Response)=>Response.json())
    .then((findresponse)=>
  {    
    if(findresponse.message)
    {
    this.setState({hourmessage:findresponse.message, reportsCheck:true, hoursAlertCheck:false});
    
    }
    else{
    this.setState({employeeprojects:findresponse.records, hideHourTable:false });

    }
  })
    
  
  }




  logout(){
    sessionStorage.setItem("userData",'');
    sessionStorage.clear();
    this.setState({redirect:true});
  }

onChange(e){
  this.setState({ [e.target.name]: e.target.value });
 
}

hoursEdit(hourDate , hour_id){
  var today = moment();
  var end = hourDate;
  var difference = today.diff(end, 'days');
  if(difference > 14)
  {   
    this.setState({diffModel:true});
  }else{
  this.setState({hoursEdit: true, hour_id:hour_id});
       
  }
}

handleHide() {
  this.setState({ modelCreated: false, modelNotcreated:false, diffModel:false });
  window.location.reload();
}

deleteHourAction = (id) =>{
   
  //console.log(lname);    
 let postData = { del_id: id , type : 'hours'};   
console.log(postData);
if (postData) {
  PostData('deleteop', postData).then((result) => {      
      let responseJSON = result;  
      if(responseJSON.successMessage){
        
        this.setState({ modelCreated:true});
      
      }
      else if(responseJSON.message){
       
        this.setState({modelNotcreated: true , errorMessage:responseJSON.message });
      }      
     
  })
}


}

deleteHour = (id) => {      

  confirmAlert({
    title:'',
    message: 'Are you sure, you wanna delete?',
    buttons: [
      {
        label: 'Yes',
        onClick: () => this.deleteHourAction(id)
      },
      {
        label: 'No',
        onClick: () => '',
      }
    ]
  })
};



  render() {
    
    if(this.state.hoursEdit){
      return(<Redirect to={'/hoursEdit/' + this.state.hour_id}/>)
    }

    if(this.state.redirect){
      return(<Redirect to={'/'}/>)
      }

    return (
      
      <div> <div className="row small-up-2 medium-up-3 large-up-4"> 
      <h4 style={{float:'left'}}>Your Timesheet</h4>
      <button type="button" className='btn btn-danger' style={{float:'right'}} onClick={this.logout}>Logout</button>
     <br/>
     <br/>
   <table className='table table-bordered table-hover' hidden={this.state.hideHourTable}> 
                      <thead>                      
                          
                          <tr>
                              <th>Date</th>
                              <th>Worked from</th>
                              <th>Worked to</th>
                              <th>Actions </th>
                          </tr>
                      </thead>
                      {
          this.state.employeeprojects.map((dynamicData,key) =>
          
                      <tbody>                  
                   
                      <tr>
              <td>{dynamicData.work_date}</td>
              <td>{dynamicData.worked_from}</td>              
              <td>{dynamicData.worked_to}</td>  
              <td>
              <button type="button" className='btn btn-info m-r-1em' style={{marginRight:'8px',width:'75px'}} onClick={() =>{this.hoursEdit(dynamicData.work_date, dynamicData.hour_id)}}>Edit</button>
              
               <button type="button" className='btn btn-danger'  style={{width:'75px'}} onClick={() =>{this.deleteHour(dynamicData.hour_id)}}>Delete</button>
               </td>          
              </tr>
              </tbody>
          )}
              </table>

              
              
              <Alert bsStyle="danger" hidden={this.state.hoursAlertCheck} style={{width:'300px'}}>
            {this.state.hourmessage}
             </Alert>
             

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
        Deleted    
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={this.handleHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    </div>

     <div className="modal-container" style={{ height: 200 }}>
   
   <Modal
      show={this.state.diffModel}
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
        You cannot update a timesheet which is 2 weeks old!
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
  Unfortunately!Unable to delete
  </Modal.Body>
  <Modal.Footer>
  <Button onClick={this.handleHide}>Close</Button>
  </Modal.Footer>
  </Modal>
  </div>
               </div> </div>
    );
  }
}

export default viewHours;
