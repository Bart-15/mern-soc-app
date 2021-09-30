import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Container, Button} from '@material-ui/core'
import Spinner from '../../components/common/Spinner'
import PropTypes from 'prop-types'
import {getPost} from '../../actions/postActions'
import PostComment from './PostComment'
class SinglePost extends Component {

    componentDidMount() {
        this.props.getPost(this.props.match.params.id)
    }
     render() {
         const {post, loading} = this.props.post;
         
         let singlePostContent;
         if(post === null || loading) {
             singlePostContent = <Spinner loading={loading} />
         } else {
             singlePostContent = <PostComment post={post} id={this.props.match.params.id} />
         }

        return (
            <Container>
                <br />
                <Button variant="contained" component={Link} to="/post-feed" color="secondary">Go Back</Button>
                <div>
                    {singlePostContent}
                </div>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    post: state.post
})

SinglePost.propTypes = {
    post: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, {getPost}) (SinglePost);