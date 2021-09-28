import React, { Component } from 'react'
import {Grid, Typography, Card, CardContent, Button} from '@material-ui/core'
import {Link} from 'react-router-dom'
import {AiFillLike, AiFillDislike} from 'react-icons/ai'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {MdInsertComment} from 'react-icons/md'
import {likePost, unlikePost, deletePost} from '../../actions/postActions'
import {withStyles} from '@material-ui/core/styles'

const useStyles = theme => ({
    cardRoot : {
        color:'#333',
        margin:'4%',
        background:' rgba( 13, 3, 3, 0.25 )',
        boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
        backdropFilter: 'blur( 5px )',
        borderRadius: '10px',
        border: '1px solid rgba( 255, 255, 255, 0.18 )',
    },
    name: {
        marginLeft:'4px'
    },
    image : {
        width:'100px',
        height:'100px',
        borderRadius:'100%'
    },
    item : {
        display: 'flex',
        flexDirection:'row',
        alignItems: 'center'
    },
    footer : {
        fontSize:'25px',
        display: 'flex',
        flexDirection:'row',
        justifyContent: 'spece-around',
    },

    icons: {
        margin: '10px',
        cursor: 'pointer',
    }
})

class PostItem extends Component {

    onLike(postId) {
        this.props.likePost(postId)
    }

    onUnlike(postId) {
        this.props.unlikePost(postId)
    }

    findUserLike(likes) {
        const user = this.props.user;
        if(likes.filter(like => like.user === user._id).length > 0) {
            return true;
        } else {
            return false;
        }
    }

    onDeletePost(postId){
        this.props.deletePost(postId);
    }
    render() {
        const posts = this.props.posts;
        const {classes} = this.props;
        const authUser = this.props.user;
        return (
            <Grid container>
                <Grid item xs={12} lg={12}>
                    {
                        posts.map((post, idx) => {
                            return (
                                <Card key={idx} className={classes.cardRoot}>
                                    <CardContent>
                                    <Grid container>
                                       <Grid className={classes.item} item xs={12} lg={6}>
                                        <img className={classes.image} src={post.avatar} alt="avatar " />
                                        <Typography className={classes.name} variant="h6">{post.name}</Typography>
                                       </Grid>
                                       <Grid item xs={12} lg={6}>
                                        <Typography variant="h6">{post.text}</Typography>
                                       </Grid>
                                        <div className={classes.footer}>
                                            <Button color={this.findUserLike(post.likes) ? 'primary' : ''}>
                                            <AiFillLike 
                                            className={classes.icons} 
                                            onClick={this.onLike.bind(this, post._id)
                                            }/>
                                            <Typography variant="contained">{post.likes.length > 0 ? post.likes.length : ''}</Typography>
                                            </Button> 
                                            <Button
                                            onClick={this.onUnlike.bind(this, post._id)}>
                                              <AiFillDislike  className={classes.icons}/>
                                            </Button>

                                            <Button component={Link} to={`/single-post/${post._id}`}>
                                                <MdInsertComment className={classes.icons} />
                                            </Button>
                                            {
                                                authUser._id === post.user ? 
                                            <Button onClick={this.onDeletePost.bind(this, post._id)} color="secondary" variant="contained">
                                                Delete Post
                                            </Button>
                                            : null
                                            }
                                        </div>
                                    </Grid>
                                    </CardContent>
                                </Card>
                            )
                        })
                    }
                </Grid>
            </Grid>
        )
    }
}

PostItem.propTypes = {
    likePost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired,
}

export default connect(null, {likePost, unlikePost, deletePost})(withStyles(useStyles)(PostItem));