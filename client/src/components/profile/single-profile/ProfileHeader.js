import React, { Component } from 'react'
import isEmpty from '../../../validation/is-empty';
import {Typography, Container} from '@material-ui/core'
import {AiFillTwitterCircle, AiFillYoutube, AiFillFacebook, AiFillInstagram, AiFillLinkedin} from 'react-icons/ai'
import {CgWebsite} from 'react-icons/cg'
import background from '../../../img/profileHeader.jpg'
import {withStyles} from '@material-ui/core/styles'

const useStyles = theme => ({
    headerContainer : {
        borderRadius :'10px',
        background:`url(${background})`,
        display:'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height:'500px',
        width:'100%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },

    profileImage : {
        borderRadius:'100%',
        width:'200px',
        height:'200px'
    },
    profileContainer : {
        display:'flex',
        color:'#fff',
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    socialContainer : {
        margin:'2px'
    },
    socialIcons : {
        marginLeft:'4px',
        fontSize:'40px',
        color:'#eb4034',
        transition:'.4s',
        '&:hover' : {
            color:'#643E46FF'
        }
    }
})
class ProfileHeader extends Component {
    render() {
        const profile = this.props.profile;
        const {classes} = this.props;
        return (
            <Container>
                <div className={classes.headerContainer}>
                    <div className={classes.profileContainer}>
                        <img className={classes.profileImage} src={profile.user.avatar} alt="User avatar" />
                        <Typography variant="h5">{profile.user.name}</Typography>
                        <Typography variant="subtitle1">{profile.status}</Typography> 
                        <Typography variant="caption">{isEmpty(profile.location) ? null : profile.location}</Typography>
                        <div className={classes.socialContainer}>
                            {isEmpty(profile.website) ? null : <a target="_blank" href={profile.website} rel="noreferrer"><CgWebsite className={classes.socialIcons} /></a> }
                            {isEmpty(profile.social && profile.social.facebook) ? null : <a target="_blank" href={profile.social.facebook} rel="noreferrer"><AiFillFacebook className={classes.socialIcons} /></a> }
                            {isEmpty(profile.social && profile.social.youtube) ? null : <a target="_blank" href={profile.social.youtube} rel="noreferrer"><AiFillYoutube className={classes.socialIcons} /></a> }
                            {isEmpty(profile.social && profile.social.twitter) ? null : <a target="_blank" href={profile.social.twitter} rel="noreferrer"><AiFillTwitterCircle className={classes.socialIcons} /></a> }
                            {isEmpty(profile.social && profile.social.instagram) ? null : <a target="_blank" href={profile.social.instagram} rel="noreferrer"><AiFillInstagram className={classes.socialIcons} /></a> }
                            {isEmpty(profile.social && profile.social.linkedin) ? null : <a target="_blank" href={profile.social.linkedin} rel="noreferrer"><AiFillLinkedin className={classes.socialIcons} /></a> }
                        </div>
                    </div>
                </div>
            </Container>
        )
    }
}

export default (withStyles(useStyles)(ProfileHeader));