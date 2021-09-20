import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {Link} from 'react-router-dom'
import {Grid, Typography, Card, CardContent, Button} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import isEmpty from '../../validation/is-empty'

const useStyles = theme => ({
    container : {
        display: 'flex',
        flexDirection: 'column',
        margin: '0 auto',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image : {
        borderRadius: '100px',
    },
    skillsContainer : {
        display:'inline-block'
    },
    btn : {
        textAlign: 'center'
    }
})

class ProfileItem extends Component {


    render() {
        const {classes} = this.props;
        const profiles = this.props.profiles
        return (
            <Grid container spacing={2}>
                    {profiles.map((profile, id) => {
                        return (
                        <Grid item xs={12} md={6} lg={4}>
                            <Card key={id}>
                              <CardContent>
                                <div className={classes.container}>
                                    <img className={classes.image} src={profile.user.avatar} alt="User profile"/>
                                    <Typography variant="subtitle1">{profile.user.name}</Typography>
                                    <Typography variant="subtitle1">{profile.status}</Typography>
                                </div>
                                <div className={classes.skillsContainer}>
                                    <Typography variant="h5">SKILL SET</Typography>
                                    {profile.skills.slice(0, 4).map((skill, index) => {
                                        return (
                                            <Typography key={index} variant="subtitle1">{skill}</Typography>
                                        )
                                    })}
                                </div>
                                <Typography variant="subtitle1">{isEmpty(profile.company) ? null :`Company: ${profile.company}`}</Typography>
                                <Typography variant="subtitle1">{isEmpty(profile.location) ? null : `Location: ${profile.location}`}</Typography>
                                <div className={classes.container}>
                                    <br />
                                    <Button type="button" className={classes.btn} variant="contained" component={Link} to={`/profile/${profile.handle}`}  color="primary">Visit Profile</Button>
                                </div>
                              </CardContent>
                            </Card>
                       </Grid>
                        )
                    })}
            </Grid>
        )
    }
}


export default  (withStyles(useStyles)((withRouter)(ProfileItem)));