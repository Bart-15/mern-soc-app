import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {Container, Button, Grid} from '@material-ui/core'
import Spinner from '../../common/Spinner';
import {Link} from 'react-router-dom'
import {getHandleProfile} from '../../../actions/profileActions'
import {ProfileAbout, ProfileHeader, ProfileGithub, ProfileCredentials} from './'
class SingleProfile extends Component {

    componentDidMount() {
        if(this.props.match.params.handle) {
            this.props.getHandleProfile(this.props.match.params.handle)
        }
    }

    
    render() {
        const {profile, loading} = this.props.profile;
        let mainProfile;
        if(profile === null || loading) {
            mainProfile = (<Spinner loading={loading} />)
        } else {
            mainProfile = (
                <Grid container spacing={2}>
                    <Grid item lg={12}>
                        <Button variant="contained" color="secondary" component={Link} to="/profiles">Back to profiles</Button>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} lg={12}>
                            <ProfileHeader profile={profile} />
                        </Grid>
                        <Grid item xs={12} lg={12}>
                             <ProfileAbout profile={profile} /> 
                        </Grid>
                        <Grid item xs={12} lg={12}>
                            <ProfileCredentials profile={profile} />    
                        </Grid>
                        <Grid item xs={12} lg={12}>
                            <ProfileGithub />
                        </Grid>
                    </Grid>
                </Grid>
            )
        }

        return (
            <Container>
                <br />
                {mainProfile}
            </Container>
        )
    }
}


SingleProfile.propTypes = {
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    profile: state.profile,
})

export default connect(mapStateToProps, {getHandleProfile}) (SingleProfile);