import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import {Typography, Container, Card, CardContent, TextField, Button} from '@material-ui/core' 
import {withStyles} from '@material-ui/core/styles'
import {connect} from 'react-redux'
import {registerUser} from '../../actions/authActions'


const useStyles = theme => ({
    container : {
        display : 'flex',
        flexDirection :'column',
        justifyContent : 'center',
        alignItems : 'center',
    },
    cardRoot: {
        width: 'auto',
        margin:'30px 0 30px 0'
    },
    formRoot: {
        '& > *': {
          margin: theme.spacing(1),
          width: '45ch',
        },
        display:'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('sm')] : {
            '& > *' : {
                width:'30ch'
            }
        }
      },
      title : {
          textAlign: 'center',
      }
});


class Register extends Component {
    constructor(){
        super();
        this.state = {
            name: '',
            email:'',
            password: '',
            password2: '',
            errors: {},
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange (e) {
        this.setState({[e.target.name]: e.target.value})
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard')
        }
    }

    componentWillReceiveProps (nextProps) {
        if(nextProps.errors){
            this.setState({errors: nextProps.errors})
        }
    }

    onSubmit(e){
        e.preventDefault()
        const newUser = {
            name: this.state.name,
            email:this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }
        this.props.registerUser(newUser, this.props.history)
    }


     render() {
        const {classes} = this.props;
        const { errors } = this.state;
        return <>
            <Container className={classes.container}>
                <Card className={classes.cardRoot}>
                    <CardContent>
                       <Typography className={classes.title} variant="h5">REGISTER</Typography>
                        <form onSubmit={this.onSubmit} className={classes.formRoot}>
                            <TextField
                            error={errors.name ? true : false}
                            onChange={this.onChange} 
                            name="name" 
                            value={this.state.name} 
                            className={classes.textField} 
                            id="outlined-basic"
                            label="Name" 
                            variant="outlined"
                            helperText={errors.name ? errors.name : ""}  />

                            <TextField 
                            error={errors.email ? true : false}
                            onChange={this.onChange} name="email"
                            value={this.state.email} 
                            className={classes.textField} 
                            id="outlined-basic" 
                            type="email"
                            label="Email"
                            variant="outlined"
                            helperText={errors.email ? errors.email : ""} />

                            <TextField 
                            error={errors.password ? true : false}
                            onChange={this.onChange} 
                            name="password" 
                            value={this.state.password} 
                            className={classes.textField} 
                            id="outlined-basic" 
                            type="password" 
                            label="Password" 
                            variant="outlined"
                            helperText={errors.password ? errors.password : ""} />

                            <TextField 
                            error={errors.password2 ? true : false}
                            onChange={this.onChange} 
                            name="password2" 
                            value={this.state.password2} 
                            className={classes.textField} 
                            id="outlined-basic" 
                            type="password" 
                            label="Confirm Password"
                            variant="outlined"
                            helperText={errors.password2 ? errors.password2 : ""} />
                            <Button variant="contained" type="submit" color="primary">SignUp</Button>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </>
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth:state.auth,
    errors:state.errors
})

export default connect(mapStateToProps, {registerUser}) (withStyles(useStyles)(withRouter(Register)));