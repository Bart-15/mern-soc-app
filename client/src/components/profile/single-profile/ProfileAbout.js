import React, { Component } from 'react'
import {Container, Grid, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import {AiFillThunderbolt} from 'react-icons/ai'
const useStyles = theme => ({
    skillsContainer : {
        textAlign: 'center'
    },
    skillsItem : {
        display: 'inline-block',
        marginLeft:'2px',
        fontSize:'20px'
    }
})
class ProfileAbout extends Component {
    render() {
        const profile = this.props.profile
        const {classes} = this.props;
        const name = profile.user.name.trim().split(' ')[0]
        return (
            <Container>
                <Grid container>
                    <Grid item xs={12} lg={12}>
                        <Typography align="center" variant="h4">{`${name}'s`} Bio</Typography>
                        <hr />
                    </Grid>
                    <Grid item xs={12} lg={12}>
                        <div className={classes.skillsContainer}>
                            <Typography variant="h5">Skill Set</Typography>
                            {
                                profile.skills.map((item, idx) => {
                                    return (
                                        <div className={classes.skillsItem}>
                                            <p><AiFillThunderbolt color="#FFA500"/>{item}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>  
                    </Grid>
                </Grid>
            </Container>
        )
    }
}

export default ((withStyles)(useStyles)(ProfileAbout));