import React, { Component } from 'react'
import {Container, Typography, Card, CardContent, TextField} from '@material-ui/core'


import {withStyles} from '@material-ui/core/styles'
// styles

const useStyles = theme => ({
    container: {
    },
    root : {
        display : 'flex',
        margin:'0 auto',
        width:'40%'
    },

    formRoot : {
        '& > *': {
            margin: theme.spacing(2),
            width: '50ch',
          },
    }
})


class AddEducation extends Component {
    constructor() {
        super() 
        this.state = {
            title: '',
            company: '',
            location:'',
            from:'',
            to:'',
            description:'',
            date: new Date(),
            errors: {}
        }
       
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.handleDateChange  = this.handleDateChange.bind(this)
    }

    onSubmit(e) {
        e.preventDefault()
    }

    handleDateChange(e) {
        console.log(e.target.value)
    }
   
    onChange(e) {
        this.setState({[e.target.name] : e.target.value})
    }
    render() {
        const {classes} = this.props;
        return (
            <Container className={classes.container}>
                <Typography variant="h5">Add Education</Typography>
                <div className={classes.root}>
                    <Card className={classes.card}>
                        <CardContent>
                            <form onSubmit={this.onSubmit} className={classes.formRoot}>
                                <TextField 
                                name="title" 
                                value={this.state.title} 
                                onChange={this.onChange} 
                                label="Job Tite" 
                                variant="outlined"/>

                                <TextField 
                                name="company" 
                                value={this.state.company} 
                                onChange={this.onChange} 
                                label="Company" 
                                variant="outlined"/>   
 
                                <TextField 
                                name="location" 
                                value={this.state.location} 
                                onChange={this.onChange} 
                                label="Location" 
                                variant="outlined"/> 
                                
                                

                            </form>
                        </CardContent>
                    </Card>
                </div>
            </Container>
        )
    }
}


export default (withStyles(useStyles))(AddEducation);