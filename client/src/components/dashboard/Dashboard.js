import React, { Component } from 'react'
import PropTypes from 'prop-types'
import{connect} from 'react-redux'
import {getCurrentProfile, deleteAccount} from '../../actions/profileActions'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {Container, Typography, Grid, Button} from '@material-ui/core'
import Spinner from '../common/Spinner'
import ProfileActions from '../dashboard/ProfileActions'
class Dashboard extends Component {
    constructor(){
        super()
        this.onDelete = this.onDelete.bind(this)
    }

    componentDidMount() {
        this.props.getCurrentProfile();
    }

    onDelete(e) {
        this.props.deleteAccount();
    }
    
    render() {

        const {user} = this.props.auth;
        const {profile, loading} = this.props.profile;

        let content;

        // styled container
        const NoProfileContainer = styled.div`
            display:inline-block;
            justify-content:center;
            width:400px;
            margin:30px;
        `;


        if(profile === null || loading) {
            content = <Spinner loading={loading} />
        } else {
            if(Object.keys(profile).length > 0) {
                content = (
                    <Container>
                        <Typography variant="h5">Welcome <Typography component={Link} to={`/profile/${profile.handle}`}variant="subtitle1">{profile.handle}</Typography></Typography>
                        <ProfileActions />
                        <br />
                        <Button onClick={this.onDelete} color="secondary" variant="contained">Delete Account</Button>
                        <br />
                        <br />
                    </Container>
                )
            } else {
                content = (
                    <NoProfileContainer>
                        <Typography variant="h5">Welcome {user.name}</Typography>
                        <Typography variant="caption">You have not yet setup a profile, please add some info.</Typography>
                        <Button color="primary" component={Link} to="/create-profile" variant="contained">Create Profile</Button>
                    </NoProfileContainer>
                )
            }
        }


        
        return (
            <div>
                <Container>
                    <Grid>{content}</Grid>
                </Container>
            </div>
        )
    }
}


Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
}) 

export default connect(mapStateToProps, {getCurrentProfile, deleteAccount}) (Dashboard);