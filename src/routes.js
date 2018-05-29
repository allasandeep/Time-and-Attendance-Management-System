import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import employeeSignup from './components/employeeSignup/employeeSignup';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import NotFound from './components/NotFound/NotFound';
import Welcome from './components/Welcome/Welcome';
import employeeHome from './components/employeeHome/employeeHome';
import employeeEdit from './components/employeeEdit/employeeEdit';
import createProject from './components/createProject/createProject';
import supervisorHome from './components/supervisorHome/supervisorHome';
import addHours from './components/addHours/addHours';
import viewHours from './components/viewHours/viewHours'
import addEmployees from './components/addEmployees/addEmployees';
import detailedReport from './components/detailedReport/detailedReport';
import summaryReport from './components/summaryReport/summaryReport';
import hoursReport from './components/hoursReport/hoursReport';
import ReadEmployees from './components/Home/ReadEmployees/ReadEmployees';
import ReadProjects from './components/Home/ReadProjects/ReadProjects';
import projectEdit from './components/projectEdit/projectEdit';
import hoursEdit from './components/hoursEdit/hoursEdit';
import superAddEmployees from './components/superAddEmployees/superAddEmployees';
import viewHoursSuper from './components/viewHoursSuper/viewHoursSuper';

export default ({ childProps }) => 
<BrowserRouter>
<Switch>
    <Route exact path='/' component={Welcome}/>
    <Route path='/login'  component={Login} />    
    <Route  path='/home/:empid' component={Home}/>    
    <Route  path='/employeeHome/:empid' component={employeeHome}/>
    <Route  path='/supervisorHome/:empid' component={supervisorHome}/>
    <Route  path='/addHours/:empid/:projid' component={addHours}/>
    <Route  path='/viewHours/:empid' component={viewHours}/>
    <Route  path='/viewHoursSuper/:empid' component={viewHoursSuper}/>
    <Route  path='/addEmployees' component={addEmployees}/>   
    <Route  path='/superAddEmployees/:empid' component={superAddEmployees}/>   
    <Route  path='/employeeSignup' component={employeeSignup}/>    
    <Route  path='/createProject' component={createProject}/>
    <Route path='/detailedReport/:empid' component={detailedReport}/>
    <Route path='/summaryReport/:empid' component={summaryReport}/>
    <Route path='/hoursReport/:empid' component={hoursReport}/>
    <Route  path='/employeeEdit/:empid' component={employeeEdit}/>   
    <Route path='/allEmployees' component={ReadEmployees}/>
    <Route path='/allProjects' component={ReadProjects}/>
    <Route path='/hoursEdit/:empid' component={hoursEdit}/>
    <Route path='/projectEdit/:empid' component={projectEdit}/>
    <Route  path='*' component={NotFound}/>
    </Switch>
    </BrowserRouter>



