import axios from 'axios';

import {GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS, SET_CURRENT_USER} from './types'

// getcurrent profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading())
    axios.get('/api/profile')
    .then(res => dispatch({
        type: GET_PROFILE,
        payload: res.data
    })).catch(err => dispatch({
        type:GET_PROFILE,
        payload: {}
    }))
}

// profile loading

export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
} 

export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}

export const createNewProfile = (profileData, history) => dispatch => {
    axios.post('/api/profile/', profileData)
        .then(res =>  history.push('/dashboard'))
        .catch(err => dispatch({
            type:GET_ERRORS,
            payload: err.response.data
        }))

}

export const createNewExp = (expData, history) => dispatch =>  {
    axios.post('/api/profile/experience', expData)
        .then(res => history.push('/dashboard'))
        .catch(err => dispatch({
            type:GET_ERRORS,
            payload: err.response.data
        }))
}

export const createNewEduc = (educData, history) => dispatch => {
    axios.post('/api/profile/education', educData)
        .then(res => history.push('/dashboard'))
        .catch(err => dispatch({
            type:GET_ERRORS,
            payload: err.response.data
        }))
}

export const deleteEducation = (id, history) => dispatch => {
   axios.delete(`/api/profile/experience/${id}`)
   .then(res => history.push('/dashboard'))
   .catch(err => dispatch({
       type:GET_ERRORS,
       payload:err.response.data
   }))
}


export const deleteAccount = () => dispatch => {
   if(window.confirm('Are you sure you want to delete this account?')){
       axios.delete('/api/profile/')
        .then((res) => {
            localStorage.removeItem('jwtToken')
            dispatch({
                type:SET_CURRENT_USER,
                payload: {}
            })
        })
        .catch((err) => {
            dispatch({
                type:GET_ERRORS,
                payload: err.response.data
            })
        })
   }
}