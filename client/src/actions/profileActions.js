import axios from 'axios';

import {GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS} from './types'

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