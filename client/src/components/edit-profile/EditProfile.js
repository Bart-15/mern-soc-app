import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Container, Typography, Card, CardContent, Button, TextField} from '@material-ui/core'
import {withRouter, Link} from 'react-router-dom'
import styled from 'styled-components';
import {withStyles} from '@material-ui/core/styles'
import isEmpty from '../../validation/is-empty'
import {MdArrowBack} from 'react-icons/md'
import {createNewProfile, getCurrentProfile} from '../../actions/profileActions'
import PropTypes from 'prop-types'

// useStyles
const useStyles = theme => ({
    container : {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin:'0 auto',
    },
    cardRoot: {
        width:'auto',
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
        [theme.breakpoints.down('sm')] : {
            '& > *': {
                width:'30ch'
            }
         },
 
        
      },
      title : {
          color:'red',
          fontSize:'30px'
      }
})


class EditProfile extends Component {
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

        if(nextProps.profile.profile) {
           const profile = nextProps.profile.profile;
           
           const skillsCSV = profile.skills.join(',')

        //check every field
        profile.handle = !isEmpty(profile.handle) ? profile.handle : '' 
        profile.company = !isEmpty(profile.company) ? profile.company : ''
        profile.website = !isEmpty(profile.website) ? profile.website : ''  
        profile.location = !isEmpty(profile.location) ? profile.location : ''
        profile.status = !isEmpty(profile.status) ? profile.status : ''  
        profile.bio = !isEmpty(profile.bio) ? profile.bio : '' 
        profile.github = !isEmpty(profile.github) ? profile.github : '' 
        profile.social = !isEmpty(profile.social) ? profile.social : {}
        profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : '' 
        profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : ''
        profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : ''
        profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : ''
        profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : ''
        this.setState({
            handle: profile.handle, 
            company: profile.company,
            website: profile.website,
            location: profile.location,
            bio: profile.bio,
            github: profile.github,
            status: profile.status,
            skills: skillsCSV,
            youtube: profile.youtube,
            facebook: profile.facebook,
            linkedin: profile.linkedin,
            twitter: profile.twitter,
            instagram: profile.instagram,

        })
        }
    }

    componentDidMount () {
        this.props.getCurrentProfile();
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

        
        
        // Header
        const Header = styled.div`
            display:flex;
            flex-wrap:wrap;
            flex-direction:row;
            justify-content:flex-start;
            align-items:center;
            margin:10px;
        `
        return (
            <Container className={classes.container}>
                <Header>
                    <Button component={Link} to="/dashboard" className={classes.title} variant="h5"><MdArrowBack /></Button>
                    <Typography variant="h4">Edit Profile</Typography>
                </Header>
                <Card className={classes.cardRoot}>
                    <CardContent>
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
                            helperText={errors.status ? errors.status : "You Job Title"} 
                            name="status"
                            onChange={this.onChange}
                            value={this.state.status}
                            type="text" 
                            label="Status" 
                            variant="outlined" 
                            />
                        


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

                            <Button color="primary" type="submit" variant="contained">Edit Profile</Button>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        )
    }
}


EditProfile.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    createNewProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps, {createNewProfile, getCurrentProfile}) (withStyles(useStyles)(withRouter(EditProfile)));