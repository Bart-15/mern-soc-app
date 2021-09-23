import React, { Component } from 'react'
import {Container, Card, Button, Typography, TextField} from '@material-ui/core'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {connect} from 'react-redux'
import {addPost} from '../../actions/postActions'
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

class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text:'',
            errors:{}
        };
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    componentWillReceiveProps(newProps) {
        if(newProps.errors) {
            this.setState({errors: newProps.errors})
        }
    }

    handleSubmit(e) {
        e.preventDefault()
        const { user } = this.props.auth;
        const newPost = {
            text: this.state.text,
            name: user.name, 
            avatar: user.avatar
        }

        this.props.addPost(newPost)
        this.setState({text: '', errors:{}})

    }

    onChange(e) {
        this.setState({[e.target.name] : e.target.value})
    }

    render() {
        const {classes} =  this.props;
        const {errors} = this.state;
        return (
            <Container>
                <br />
                <Card  className={classes.cardRoot}> 
                        <div className={classes.headerTitle}>
                        <Typography variant="h5">What's on your head?</Typography>
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
                            label="Add Post"
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

Post.propTypes = {
    auth: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    addPost: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth:state.auth,
    errors:state.errors
})

export default connect(mapStateToProps, {addPost})  (withStyles(useStyles)(Post));