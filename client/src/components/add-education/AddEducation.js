import React, { Component } from 'react'
import {Container, Typography, Card, CardContent, TextField, Button} from '@material-ui/core'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'
import { createNewEduc } from '../../actions/profileActions'
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


class AddEducation extends Component {
    constructor() {
        super() 
        this.state = {
            school: '',
            degree: '',
            fieldofstudy:'',
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

        const educData = {
            school: this.state.school,
            degree: this.state.degree,
            fieldofstudy: this.state.fieldofstudy,
            from: this.state.from,
            to: this.state.to,
            description: this.state.description,
        }

        this.props.createNewEduc(educData, this.props.history)
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
                <Typography variant="h5">Add Education</Typography>
                <div className={classes.root}>
                    <Card className={classes.card}>
                        <CardContent>
                            <form onSubmit={this.onSubmit} className={classes.formRoot}>
                                
                                <TextField 
                                error={errors.school ? true :  false}
                                helperText={errors.school ? errors.school : ""}
                                name="school" 
                                value={this.state.school} 
                                onChange={this.onChange} 
                                label="Name of your School" 
                                variant="outlined"/>

                                <TextField 
                                name="degree" 
                                error={errors.degree ? true :  false}
                                helperText={errors.degree ? errors.degree : ""}
                                value={this.state.degree} 
                                onChange={this.onChange} 
                                label="Degree" 
                                variant="outlined"/>   
                                
                                <TextField 
                                name="fieldofstudy" 
                                value={this.state.fieldofstudy} 
                                onChange={this.onChange} 
                                label="Fieldofstudy" 
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
                                   <Typography variant="subtitle1">Current School</Typography>
                               </div>
                               
                               <TextField 
                                   name="description" 
                                   value={this.state.description} 
                                   onChange={this.onChange} 
                                   multiline
                                   rows={2}
                                   variant="outlined"
                                   label="Description"/> 
                               <Button type="submit" variant="contained"> Submit</Button>
                               {/* <Checkbox
                                    name="current"
                                    checked={this.state.current}
                                    onChange={handleChange("breakfast")}
                                    /> */}
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </Container>
        )
    }
}


AddEducation.propTypes = {
    createNewEduc: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}



const mapStateToProps = (state) => ({
    errors: state.errors,
    profile: state.profile
})

export default connect(mapStateToProps, {createNewEduc}) ((withStyles(useStyles))((withRouter)(AddEducation)));