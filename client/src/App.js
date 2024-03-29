import {Component} from 'react'
// Router config
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import { Provider } from 'react-redux'
import {setCurrentUser} from './actions/authActions'
import store from './store'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken';
import { logoutUser } from './actions/authActions';
import {clearCurrentProfile} from './actions/profileActions'
import PrivateRoute from './components/common/PrivateRoute'
import {Login, Register, NavBar, LandingPage, Footer, Dashboard, CreateProfile, EditProfile, AddExperience, AddEducation, Profiles, SingleProfile, PostFeed, SinglePost} from './components'
import './App.css';



// check if valid token exists

if(localStorage.jwtToken){
  setAuthToken(localStorage.jwtToken)
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded))

  const currentTime = Date.now() / 1000; //
  if(decoded.exp < currentTime) {

    //Logout user
    store.dispatch(logoutUser())

    // clear the current_profile
    store.dispatch(clearCurrentProfile())
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
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile/:handle" component={SingleProfile} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/create-profile" component={CreateProfile} />
                <PrivateRoute exact path="/edit-profile" component={EditProfile} />
                <PrivateRoute exact path="/add-experience" component={AddExperience} />
                <PrivateRoute exact path="/add-education" component={AddEducation} />
                <PrivateRoute exact path="/post-feed" component={PostFeed} />
                <PrivateRoute exact path="/single-post/:id" component={SinglePost} />
              </Switch>
            </div>
            <Footer />
          </Router>
      </Provider>
    </>
    )
  }
}
export default App;
