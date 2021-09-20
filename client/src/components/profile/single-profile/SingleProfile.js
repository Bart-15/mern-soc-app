import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {Container} from '@material-ui/core'
import {getHandleProfile} from '../../../actions/profileActions'
import {ProfileAbout, ProfileHeader, ProfileGithub, ProfileCredentials} from './'
class SingleProfile extends Component {

    componentDidMount() {
        if(this.props.match.params.handle) {
            this.props.getHandleProfile(this.props.match.params.handle)
        }
    }
    render() {
        return (
            <Container>
                <ProfileHeader />
                <ProfileAbout />
                <ProfileCredentials />
                <ProfileGithub />
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