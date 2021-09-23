import axios from 'axios'
import { ADD_POST, GET_ERRORS, GET_POSTS, POST_LOADING } from './types'


export const addPost = (postData) => dispatch => {
    axios.post('/api/posts', postData)
       .then(res => dispatch({
           type: ADD_POST,
           payload: res.data
       }))
       .catch(err => dispatch({
           type:GET_ERRORS,
           payload: err.response.data
       }))
}


export const fetchAllPost = () => dispatch => {
    dispatch(setPostLoading())
    axios.get('/api/posts')
        .then(res => dispatch({
            type:GET_POSTS,
            payload: res.data
        }))
        .catch(err => dispatch({
            type:GET_ERRORS,
            payload: err.response.data
        }))
}

export const likePost = (postId, userId, history) => dispatch => {
    axios.post(`/api/posts/like/${postId}`, userId)
        .then(response => history.push('/post-feed'))
        .catch(err => dispatch({
            type:GET_ERRORS,
            payload: err.response.data
        }))

}

export const setPostLoading = ()  => {
    return {
        type: POST_LOADING,
    }
}