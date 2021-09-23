import React, { Component } from 'react'
import {Grid, Typography, Card, CardContent} from '@material-ui/core'
import {AiFillLike, AiFillDislike} from 'react-icons/ai'
import{withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {MdInsertComment} from 'react-icons/md'
import {likePost} from '../../actions/postActions'
import {withStyles} from '@material-ui/core/styles'

const useStyles = theme => ({
    cardRoot : {
        margin:'4%',
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
        boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
        }
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

    onLike(postId, userId) {
        this.props.likePost(postId, userId, this.props.history)
    }
    render() {
        const posts = this.props.posts;
        const {classes} = this.props;
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
                                            <AiFillLike className={classes.icons} onClick={this.onLike.bind(this, post._id, post.user)}/>
                                            <AiFillDislike  className={classes.icons}/>
                                            <MdInsertComment className={classes.icons} />
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
    likePost: PropTypes.func.isRequired
}

export default connect(null, {likePost})(withStyles(useStyles)((withRouter)(PostItem)));