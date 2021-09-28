import React, { Component } from 'react'
import {Typography, Container} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import CommentForm from './CommentForm'
import CardComment from './CardComment'
const useStyles = theme => ({
    image : {
        width:'100px',
        height:'100px',
        marginRight: '10px',
        borderRadius:'100%'
    },
    commentHeader: {
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center'

    },
    text : {
        textIndent: '50px',
        textAlign: 'justify',
    }
})

class PostComment extends Component {
    render() {
        const post = this.props.post
        const {classes} =  this.props;
        return (
            <Container>
                <br />
                <div className={classes.commentHeader}>
                    <img className={classes.image} src={post.avatar} alt="user avatar" />
                    <Typography variant="subtitle1">{post.name}</Typography>
                </div>
                <div className={classes.commentBody}>
                    <Typography className={classes.text} variant="subtitle1">{post.text}</Typography>
                </div>
                <div>
                    <CommentForm />
                </div>
                <div>
                    {post.comments ? (<CardComment comments={post.comments} />) : ''}
                </div>
            </Container>
        )
    }
}


export default withStyles(useStyles)(PostComment);