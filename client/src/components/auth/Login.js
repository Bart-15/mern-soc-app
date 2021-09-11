import React, { Component } from 'react'
import {Container, Typography, Card, CardContent, Button, TextField} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import axios from 'axios'
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
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

   onSubmit(e){
        e.preventDefault()
        const user = {
            email:this.state.email,
            password:this.state.password
        }

        axios.post('/api/users/login', user).then(res => {
            console.log(res.data)
        }).catch(err => this.setState({errors: err.response.data}))
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
                        <form onSubmit={this.onSubmit} className={classes.formRoot}>
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

                            <Button type="submit" variant="contained">SignUp</Button>
                        </form>
                    </CardContent>
                </Card>
            </Container>
            </>
        )
    }
}


export default withStyles(useStyles)(Login);