import React, { Component } from 'react'
import {withStyles} from '@material-ui/core/styles'
import {Container, Grid, Typography, CardContent, Card} from '@material-ui/core'
import Moment from 'react-moment'
const useStyles = theme => ({
    school : {
        fontWeight : 'bold',
        textTransform : 'uppercase'
    }, 
    cardRoot : {
        margin:'10px',
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
        boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
        }
        }
});

class ProfileCredentials extends Component {
    render() {
        const {classes} = this.props;
        const profile = this.props.profile;


        const Experience = () => {
            return (
                <Grid xs={12} item lg={6}>
                    <Typography variant="h5" align="center">Experience</Typography>
                    {
                        profile.experience.map((exp, idx) => {
                            return (
                                <Card className={classes.cardRoot} key={idx}>
                                    <CardContent>
                                        <Typography className={classes.school} variant="h6">{exp.title}</Typography>
                                        <Moment format="YYYY/MM/DD">
                                            {exp.from} 
                                        </Moment>
                                        {" - "}
                                        <Moment format="YYYY/MM/DD">
                                            {exp.to === null ? (' Now') : <Moment format="YYYY/MM/DD">{exp.to}</Moment>}  
                                        </Moment>
                                        <Typography variant="subtitle1">Company: {exp.company}</Typography>
                                        <Typography variant="subtitle1">Location: {exp.location}</Typography>
                                        <Typography variant="subtitle1">Description: {exp.description ? exp.description : ''}</Typography> 
                                    </CardContent>
                                </Card>
                            )
                        })
                    }
                </Grid>
            )
        }

        const Education = () => {
            return (
                <Grid xs={12} item lg={6}>
                    <Typography variant="h5" align="center">Education</Typography>
                    {
                        profile.education.map((educ, idx) => {
                            return (
                                <Card className={classes.cardRoot} key={idx}>
                                    <CardContent>
                                        <Typography className={classes.school} variant="h6">{educ.school}</Typography>
                                        <Moment format="YYYY/MM/DD">
                                            {educ.from} 
                                        </Moment>
                                        {" - "}
                                        <Moment format="YYYY/MM/DD">
                                            {educ.to === null ? (' Now') : <Moment format="YYYY/MM/DD">{educ.to}</Moment>}  
                                        </Moment>
                                        <Typography variant="subtitle1">Degree: {educ.degree}</Typography>
                                        <Typography variant="subtitle1">Field of Study: {educ.fieldofstudy}</Typography>
                                        <Typography variant="subtitle1">Description: {educ.description ? educ.description : ''}</Typography> 
                                    </CardContent>
                                </Card>
                            )
                        })
                    }
                </Grid>
            )
        }


        return (
            <Container>
                <Grid container spacing={3}>
                    {<Education />}
                    {<Experience />}
                </Grid>
            </Container>
        )
    }
}


export default (withStyles(useStyles)(ProfileCredentials));