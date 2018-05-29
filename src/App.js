import React, { Component, Fragment } from "react";
import logo from './logo.svg';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Signup from './components/employeeSignup/employeeSignup';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Welcome from './components/Welcome/Welcome';
import NotFound from './components/NotFound/NotFound';
import Routes from './routes';
import './styles/foundation.min.css';
import './styles/custom.css';


class App extends Component {

  constructor(props){
    super(props);
    this.state={
      appName : 'Time Management System',
      isAuthenticated: false     
    };
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }


  render() {

    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
   

    return (
      
    <div className="off-canvas-wrapper">
    <div className="off-canvas-content-inner" data-off-canvas-content>
    <div className="off-canvas-content" data-off-canvas-content>
 
 
 <Header  name={this.state.appName} />
 <Routes childProps={childProps} />
  

    <hr/>

    <Footer />
  
</div>
</div>
</div>
    );
  }
  
}

export default App;
