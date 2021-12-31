import React from 'react'
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import MainContainer from './components/MainContainer'
import CreatePost from './components/CreatePost';
import Feeds from './components/Feeds';

function App() {
  
  return (
    <div className="App">
      <Router>
        <Switch>
              <MainContainer>
                <Route exact path="/" component={CreatePost} /> 
                <Route exact path="/feeds" component={Feeds} />   
              </MainContainer>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
