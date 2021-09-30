import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getProfiles} from '../../actions/profileActions'
import {Container} from '@material-ui/core'
import ProfileItem from './ProfileItem'
import Spinner from '../common/Spinner'


class Profiles extends Component {
    componentDidMount() {
        this.props.getProfiles()
    }

    
    render() {
        const {profiles, loading} = this.props.profile;
        let profileItems;

        const NoProfile = () => {
            return (
                <div>
                    <h1>No profiles...</h1>
                </div>
            )
        }

        if(profiles === null || loading) {
             profileItems =  <Spinner loading={loading} />
        } else if(profiles.length > 0) {
            profileItems =  <ProfileItem profiles={profiles} />
        } else {
            profileItems = <NoProfile />
        }

        return (
            <Container>
                <br />
                {profileItems}
                <br />
            </Container>
        )
    }
}


Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    profile: state.profile,
})

export default connect(mapStateToProps, {getProfiles}) (Profiles);