// Register
import {GET_ERRORS, SET_CURRENT_USER} from './types'
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/register', userData)
    .then(res => history.push('/login'))
    .catch(err => dispatch({
        type:GET_ERRORS,
        payload:err.response.data
    }))
}

export const loginUser = userData => dispatch => {
    axios.post('/api/users/login', userData)
          .then(res => {
                const {token} = res.data;
                // // save in local storage
                localStorage.setItem('jwtToken', token) 
                setAuthToken(token);
                
               
                // decode token 
                const decoded = jwt_decode(token);

                // dispatch
                dispatch(setCurrentUser(decoded));
          }).catch(err => dispatch({
              type:GET_ERRORS,
              payload: err.response.data
          }))
}

// setLoggedin user

export const setCurrentUser = decoded => {
    return {
        type:SET_CURRENT_USER,
        payload:decoded
    }
}

export const logoutUser = () => dispatch => {
    // remove token from local localStorage
    localStorage.removeItem('jwtToken')

    // Remove in the auth header
    setAuthToken(false);

    // setCurrent user to isAuthenticated === false :)
    dispatch(setCurrentUser({}))
    

}