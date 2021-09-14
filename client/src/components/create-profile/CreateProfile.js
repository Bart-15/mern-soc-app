import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Container, Typography, Card, CardContent, Button, TextField, MenuItem} from '@material-ui/core'
import {withRouter} from 'react-router-dom'
import styled from 'styled-components';
import {withStyles} from '@material-ui/core/styles'
import {createNewProfile} from '../../actions/profileActions'
import PropTypes from 'prop-types'

// useStyles
const useStyles = theme => ({
    container : {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin:'0 auto',
    },
    cardRoot: {
        width:'800px',
        margin:'30px 0 30px 0'
    },
    formRoot: {
        '& > *': {
          margin: theme.spacing(1),
          width: '80ch',
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


class CreateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displaySocialInputs: false,
            handle: '',
            company:'',
            website:'',
            location:'',
            bio:'',
            status:'',
            github:'',
            skills:'',
            youtube:'',
            twitter:'',
            facebook:'',
            linkedin:'',
            instagram:'',
            errors:{}
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({ errors: nextProps.errors})
        }
    }


    onChange (e) {
        this.setState({[e.target.name] : e.target.value})
    }



    onSubmit(e) {
        e.preventDefault()
        const newProfile = {
            handle: this.state.handle,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            bio: this.state.bio,
            status: this.state.status,
            github: this.state.github,
            skills: this.state.skills,
            youtube: this.state.youtube,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            instagram: this.state.instagram,
        }
        this.props.createNewProfile(newProfile, this.props.history)
    }



    render() {

        const {classes} = this.props;
        const {errors} =  this.state;
        // options   
        const options = [
            {
                id:1,
                value:'Jr developer'
            },

            {
                id:2,
                value:'Mid developer'
            },

            {
                id:3,
                value:'Senior developer'
            }
        ] 

        
        
        // Header
        const Header = styled.div`
            display:flex;
            flex-wrap:wrap;
            flex-direction:column;
            justify-content:center;
            align-items:center;
        `
        return (
            <Container className={classes.container}>
                <Header>
                    <Typography variant="h4">Create Your Profile</Typography>
                    <Typography variant="subtitle1">Let's get some information about yourself to make your profile stand out.</Typography>
                </Header>
                <Card className={classes.cardRoot}>
                    <CardContent>
                       <Typography className={classes.title} variant="h5">REGISTER</Typography>
                        <form onSubmit={this.onSubmit} className={classes.formRoot}>

                            <TextField
                            error={errors.handle ? true : false}
                            helperText={errors.handle ? errors.handle : ""}
                            id="outlined-basic" 
                            name="handle"
                            onChange={this.onChange}
                            value={this.state.handle}
                            type="text" 
                            label="Handle" 
                            variant="outlined" 
                            />

                            <TextField
                            id="outlined-basic" 
                            name="company"
                            onChange={this.onChange}
                            value={this.state.company}
                            type="text" 
                            label="Company" 
                            variant="outlined" 
                            />

                            <TextField
                             error={errors.website ? true : false}
                             helperText={errors.website ? errors.website : ""}
                            id="outlined-basic" 
                            name="website"
                            onChange={this.onChange}
                            value={this.state.website}
                            type="text" 
                            label="Website" 
                            variant="outlined" 
                            />

                            <TextField
                            id="outlined-basic" 
                            name="location"
                            onChange={this.onChange}
                            value={this.state.location}
                            type="text" 
                            label="Location" 
                            variant="outlined" 
                            />

                            <TextField
                            id="outlined-basic" 
                            name="bio"
                            multiline
                            rows={4}
                            onChange={this.onChange}
                            value={this.state.bio}
                            type="text" 
                            label="Bio" 
                            variant="outlined" 
                            />

                           

                            <TextField
                            id="outlined-basic"
                            error={errors.status ? true : false}
                            helperText={errors.status ? errors.status : ""}
                            select 
                            name="status"
                            onChange={this.onChange}
                            value={this.state.status}
                            type="text" 
                            label="Status" 
                            variant="outlined" 
                            >
                            {
                                options.map((option) => (
                                    <MenuItem key={option.id} value={option.value} >
                                        {option.value}
                                    </MenuItem>
                                ))
                            }
                            </TextField>

                            <TextField
                            id="outlined-basic" 
                            name="github"
                            onChange={this.onChange}
                            value={this.state.github}
                            type="github" 
                            label="Github Username" 
                            variant="outlined" 
                            />

                            <TextField
                            error={errors.skills ? true : false}
                            helperText={errors.skills ? errors.skills : ""}
                            id="outlined-basic" 
                            name="skills"
                            onChange={this.onChange}
                            value={this.state.skills}
                            type="skills" 
                            label="Skills" 
                            variant="outlined" 
                            />

                            <TextField
                            id="outlined-basic" 
                            error={errors.youtube ? true : false}
                            helperText={errors.youtube ? errors.youtube : ""}
                            name="youtube"
                            onChange={this.onChange}
                            value={this.state.youtube}
                            type="youtube" 
                            label="Youtube" 
                            variant="outlined" 
                            />

                            <TextField
                            error={errors.twitter ? true : false}
                            helperText={errors.twitter ? errors.twitter : ""}
                            id="outlined-basic" 
                            name="twitter"
                            onChange={this.onChange}
                            value={this.state.twitter}
                            type="twitter" 
                            label="Twitter" 
                            variant="outlined" 
                            />

                            <TextField
                            error={errors.facebook ? true : false}
                            helperText={errors.facebook ? errors.facebook : ""}
                            id="outlined-basic" 
                            name="facebook"
                            onChange={this.onChange}
                            value={this.state.facebook}
                            type="text" 
                            label="Facebook" 
                            variant="outlined" 
                            />

                            <TextField
                            error={errors.linkedin ? true : false}
                            helperText={errors.linkedin ? errors.linkedin : ""}
                            id="outlined-basic" 
                            name="linkedin"
                            onChange={this.onChange}
                            value={this.state.linkedin}
                            type="text" 
                            label="LinkedIn" 
                            variant="outlined" 
                            />

                            <TextField
                            error={errors.instagram ? true : false}
                            helperText={errors.instagram ? errors.instagram : ""} 
                            id="outlined-basic" 
                            name="instagram"
                            onChange={this.onChange}
                            value={this.state.instagram}
                            type="text" 
                            label="Instagram" 
                            variant="outlined" 
                            />

                            <Button type="submit" variant="contained">Submit</Button>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        )
    }
}


CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps, {createNewProfile}) (withStyles(useStyles)(withRouter(CreateProfile)));