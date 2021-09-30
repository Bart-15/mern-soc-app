import React, { Component } from 'react'
import {Container, Grid, Typography, Card, CardContent, Button} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

const useStyles = theme => ({
    title : {
        textTransform:'uppercase',
        fontWeight:'bold'
    }, 
    cardRoot : {
        margin:'5px'
    },
    btn : {
        textDecoration:'none',
        color:'#fff'
    },
    Container : {
        display:'flex',
        flexDirection:'column',

    }
})

class ProfileGithub extends Component {
    constructor(props) {
        super(props)
        this.state = {
            clientId: 'aa91c2b5cfd5e61826af',
            clientSecret: 'cb7ead8138f0e3061939d649400a48125de5a5cd',
            count:5,
            sort:'created: asc',
            repos:[]
        }
    }

    componentDidMount() {
        const username = this.props.username
        const {count, sort, clientId, clientSecret} = this.state;

        fetch(`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`)
        .then(res => res.json())
        .then(data => {
            this.setState({repos: data})
        })
        .catch(err => console.log(err));
    }
    render() {
        const {repos} = this.state;
        const {classes} = this.props;

        let githubContainer;

        if(!repos.length) {
            githubContainer = null;
        } else {
            githubContainer = (
                <div>
                    <Typography variant="h5" align="center">Github Repo</Typography>
                    {
                        repos.map((item, idx) => {
                            return (
                                <Card className={classes.cardRoot} key={idx}>
                                    <CardContent>
                                        <div className={classes.Container}>
                                        <Typography className={classes.title} variant="subtitle1">{item.name}</Typography>
                                        <Typography variant="caption">Fork: {item.forks_count}</Typography>
                                        <Typography variant="caption">Stars: {item.stargazers_count}</Typography>
                                        <Typography variant="caption">Watcher: {item.watchers}</Typography>
                                        </div>
                                        <Button  variant="contained" color="primary">
                                            <a target="_blank" rel="noopener noreferrer"className={classes.btn} href={item.html_url}>{item.name}</a>
                                        </Button>
                                    </CardContent>
                                </Card>
                            )
                        })
                    }
                </div>
            )
        }


        return (
                <Container>
                    <Grid item xs={12} lg={6}>
                        {githubContainer}
                    </Grid>
                    <br />
                </Container>
        )
    }
}

export default (withStyles(useStyles)(ProfileGithub));