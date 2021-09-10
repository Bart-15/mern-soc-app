import {Component} from 'react'
// Router config
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import Login from './components/auth/Login'
import Register from './components/auth/Register'
import NavBar from './components/layouts/NavBar'
import LandingPage from './components/layouts/LandingPage'
import Footer from './components/layouts/Footer'
import './App.css';

class App extends Component {
  render() {
    return(
      <>
      <Router>
        <NavBar />
        <Route exact path="/" component={LandingPage} />
        <div>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </div>
        <Footer />
      </Router>
    </>
    )
  }
}
export default App;
