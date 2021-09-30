import React, { Component } from 'react'
import {Container, Typography, Card, CardContent, TextField, Button} from '@material-ui/core'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'
import {Link} from 'react-router-dom'
import { createNewExp } from '../../actions/profileActions'
// styles

const useStyles = theme => ({
    container: {
    },
    root : {
        display : 'flex',
        margin:'0 auto',
    },

    formRoot : {
        '& > *': {
            marginBottom: '10px',
            width:'100%'
          },
    }
})


class AddExperience extends Component {
    constructor() {
        super() 
        this.state = {
            title: '',
            company: '',
            location:'',
            from:'',
            to:'',
            description:'',
            current: false,
            disabled: false,
            errors: {}
        }
       
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onCheck = this.onCheck.bind(this)
    }

    onSubmit(e) {
        e.preventDefault()

        const expData = {
            title: this.state.title,
            company: this.state.company,
            location: this.state.location,
            from: this.state.from,
            to: this.state.to,
            description: this.state.description,
        }

        this.props.createNewExp(expData, this.props.history)
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }
    }
    onCheck(e) {
        this.setState({ 
            disabled: !this.state.disabled,
            current: !this.state.current,
        })
    }
    onChange(e) {
        this.setState({[e.target.name] : e.target.value})
    }
    render() {
        const {classes} = this.props;
        const {errors} = this.state;
        return (
            <Container className={classes.container}>
                <br />
                <Button to="dashboard" variant="contained" color="secondary" component={Link}> Go Back</Button>
                <Typography variant="h5">Add Experience</Typography>
                <div className={classes.root}>
                    <Card className={classes.card}>
                        <CardContent>
                            <form onSubmit={this.onSubmit} className={classes.formRoot}>
                                
                                <TextField 
                                error={errors.title ? true :  false}
                                helperText={errors.title ? errors.title : ""}
                                name="title" 
                                value={this.state.title} 
                                onChange={this.onChange} 
                                label="Job Title" 
                                variant="outlined"/>

                                <TextField 
                                name="company" 
                                error={errors.company ? true :  false}
                                helperText={errors.company ? errors.company : ""}
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
                                
                                <TextField 
                                    type="date"
                                    name="from" 
                                    error={errors.from ? true :  false}
                                    value={this.state.from} 
                                    onChange={this.onChange}
                                    helperText={errors.from ? errors.from : "From Date"} 
                                    label="" 
                                    variant="outlined"/>   
 
                                <TextField 
                                    type="date"
                                    name="to" 
                                    value={this.state.to} 
                                    onChange={this.onChange} 
                                    helperText="To Date"
                                    label="" 
                                    disabled={this.state.disabled ? true : false}
                                    variant="outlined"/>   
                               <div style={{display: "flex", alignItems: "center"}}>
                                   <input type="checkbox" value={this.state.current} checked={this.state.current} name="current" onChange={this.onCheck}/>
                                   <Typography variant="subtitle1">Current Job</Typography>
                               </div>
                               
                               <TextField 
                                   name="description" 
                                   value={this.state.description} 
                                   onChange={this.onChange} 
                                   multiline
                                   rows={2}
                                   variant="outlined"
                                   label="Description"/> 
                               <Button color="primary" type="submit" variant="contained"> Submit</Button>
                               {/* <Checkbox
                                    name="current"
                                    checked={this.state.current}
                                    onChange={handleChange("breakfast")}
                                    /> */}
                            </form>
                        </CardContent>
                    </Card>
                </div>
                <br />
            </Container>
        )
    }
}


AddExperience.propTypes = {
    createNewExp: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    errors: state.errors,
    profile: state.profile
})

export default connect(mapStateToProps, {createNewExp}) ((withStyles(useStyles))((withRouter)(AddExperience)));