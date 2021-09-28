import React, { Component } from 'react'
import {Container, Card, Button, Typography, TextField} from '@material-ui/core'
import {addComment} from '../../actions/postActions'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {connect} from 'react-redux'

const useStyles = theme => ({
    headerTitle : {
        backgroundColor:'#756ef5',
        color:'#fff',
        padding:'4px'

    },
    cardRoot : {
        padding:'0',
        border: "none",
        boxShadow: "none"
    }
})

class CommentForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text:'', 
            errors: {}
        }

        this.onChange = this.onChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    onChange(e) {
        this.setState({[e.target.name] : e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault()

        const { user } = this.props.auth;
        const {post} = this.props.post;
        const newComment = {
            name: user.name, 
            text: this.state.text,
            avatar: user.avatar
        }
        this.props.addComment(post._id, newComment);
        this.setState({text: " "})
    }

    componentWillReceiveProps(newProps) {
        if(newProps.errors) {
            this.setState({errors: newProps.errors})
        }
    }
    render() {
        const {errors} = this.state;
        const {classes} = this.props;
        return (
            <Container>
                <br />
                <Card  className={classes.cardRoot}> 
                        <div className={classes.headerTitle}>
                        <Typography variant="h5">Comment</Typography>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                            error={errors.text ? true : false}
                            helperText={errors.text ?  errors.text : " "}
                            id="outlined-multiline-static"
                            name="text"
                            value={this.state.text}
                            onChange={this.onChange}
                            fullWidth="true"
                            label="Add Comment"
                            variant="outlined"
                            multiline
                            rows={4}
                            />
                            <br />
                           <Button type="submit" variant="contained" color="primary">Submit</Button>
                        </form>
                </Card>
            </Container>
        )
    }
}


const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    post: state.post,
})

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

export default connect(mapStateToProps, {addComment}) (withStyles(useStyles)(CommentForm));