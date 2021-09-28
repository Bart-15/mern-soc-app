import axios from 'axios'
import { ADD_POST, GET_ERRORS, GET_POSTS, GET_POST, POST_LOADING, DELETE_POST } from './types'


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

export const likePost = (postId) => dispatch => {
    axios.post(`/api/posts/like/${postId}`)
        .then(response => dispatch(fetchAllPost()))
        .catch(err => dispatch({
            type:GET_ERRORS,
            payload: err.response.data
        }))

}


export const unlikePost = (postId) => dispatch => {
    axios.post(`/api/posts/unlike/${postId}`)
        .then(response => dispatch(fetchAllPost()))
        .catch(err => dispatch({
            type:GET_ERRORS,
            payload: err.response.data
        }))

}


export const deletePost = (postId) => dispatch => {
    axios.delete(`/api/post/${postId}`)
        .then(response => dispatch({
            type:DELETE_POST,
            payload: postId,
        }))
        .catch(err => dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        }))
}


export const getPost = id => dispatch => {
    dispatch(setPostLoading())
    axios.get(`/api/posts/${id}`)
        .then(res => dispatch({
            type:GET_POST,
            payload:res.data
        }))
        .catch(err => dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        }))
}

export const addComment = (id, data) => dispatch => {
    axios.post(`/api/posts/comment/${id}`, data)
        .then(res => dispatch(getPost(id)))
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