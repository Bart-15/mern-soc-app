import React, { Component } from 'react'
import PostForm from './PostForm'
import PostContainer from './PostContainer'
import {connect} from 'react-redux'
import {fetchAllPost} from '../../actions/postActions'
class PostFeed extends Component {
    
    componentDidMount() {
        this.props.fetchAllPost()
    }

    render() {
        const {posts, loading} = this.props.post;
        return <>
            <PostForm />
            <PostContainer posts={posts} loading={loading} />
        </>
    }
}
const mapStateToProps = (state) => ({
    post: state.post
})
export default connect(mapStateToProps, {fetchAllPost})(PostFeed)

