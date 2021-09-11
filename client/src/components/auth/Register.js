import React, { Component } from 'react'
import {Typography, Container, Card, CardContent, TextField, Button} from '@material-ui/core' 
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

    onSubmit(e){
        e.preventDefault()
        const newUser = {
            name: this.state.name,
            email:this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }
        axios.post('/api/register', newUser).then(response => {
            console.log(response.data)
        }).catch(error => {
           this.setState({errors: error.response.data})
           
        })
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
                            <Button type="submit" variant="contained">SignUp</Button>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </>
    }
}


export default withStyles(useStyles)(Register);