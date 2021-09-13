import {Component} from 'react'
// Router config
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import { Provider } from 'react-redux'
import {setCurrentUser} from './actions/authActions'
import store from './store'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken';
import { logoutUser } from './actions/authActions';
import {Login, Register, NavBar, LandingPage, Footer} from './components/'
import './App.css';



// check if valid token exists

if(localStorage.jwtToken){
  setAuthToken(localStorage.jwtToken)
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded))

  const currentTime = Date.now() / 1000; //
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser())
    window.location.href = '/login'
  }
}

class App extends Component {
  render() {
    return(
      <>
     <Provider store={store}>
        <Router>
          <NavBar />
          <Route exact path="/" component={LandingPage} />
          <div>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </div>
          <Footer />
        </Router>
     </Provider> 
    </>
    )
  }
}
export default App;
