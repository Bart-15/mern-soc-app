import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Container, Typography, Card, CardContent, Button, TextField} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import {connect} from 'react-redux'
import {loginUser} from '../../actions/authActions'

const useStyles = theme => ({
    container : {
        display : 'flex',
        flexDirection :'column',
        justifyContent : 'center',
        alignItems : 'center',
    },
    cardRoot: {
        width: 500,
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
      },
      title : {
          textAlign: 'center',
      }
})
class Login extends Component {

    constructor() {
        super();
        this.state = {
            email:'',
            password: '',
            errors:{}
        }
        this.inputRef = React.createRef();
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard')
        }
    }

    componentWillReceiveProps (nextProps) {
        if(nextProps.auth.isAuthenticated){
            this.props.history.push('/dashboard')
        }
        if(nextProps.errors){
            this.setState({errors: nextProps.errors})
        }
    }

   onSubmit(e){
        e.preventDefault()
        const userData = {
            email:this.state.email,
            password:this.state.password
        }
        this.props.loginUser(userData)
    }
    
    render() {
        const {classes} = this.props;
        const { errors } = this.state;
        return (
            <>
            <Container className={classes.container}>
                <Card className={classes.cardRoot}>
                    <CardContent>
                       <Typography className={classes.title} variant="h5">REGISTER</Typography>
                        <form onSubmit={this.onSubmit} className={classes.formRoot} ref={this.inputRef}>
                            <TextField
                            error={errors.email ? true : false}
                            helperText={errors.email ? errors.email : ""}
                            onChange={this.onChange} 
                            name="email" 
                            value={this.state.email} 
                            className={classes.textField} 
                            id="outlined-basic" 
                            type="email" 
                            label="Email" 
                            variant="outlined" />

                            <TextField 
                            error={errors.password ? true : false}
                            helperText={errors.password ? errors.password : ""}
                            onChange={this.onChange} 
                            name="password" 
                            value={this.state.password} 
                            className={classes.textField} 
                            id="outlined-basic" 
                            type="password" 
                            label="Password" 
                            variant="outlined" />
                            <Button type="submit" variant="contained">Login</Button>
                        </form>
                    </CardContent>
                </Card>
            </Container>
            </>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth:state.auth,
    errors:state.errors
})
export default connect(mapStateToProps, {loginUser}) (withStyles(useStyles)(Login));