import React, { Component } from 'react'
import {Container} from '@material-ui/core'
import PostItem from './PostItem'
import Spinner from '../common/Spinner'

class PostContainer extends Component {

   
    render() {
        const posts = this.props.posts;
        const loading = this.props.loading;
        const user = this.props.user;

        let postMainContent;

        if(posts === null || loading) {
            postMainContent = <Spinner loading={loading} />
        } else if (posts.length > 0) {
            postMainContent = <PostItem posts={posts} user={user}/>
        } else {
            postMainContent = <h1>NO post available</h1>
        }
        return (
            <Container>
                {postMainContent}
            </Container>
        )
    }
}


export default PostContainer;