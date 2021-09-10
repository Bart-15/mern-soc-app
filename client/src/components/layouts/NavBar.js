
import React,  {Component} from 'react'
import {AppBar, Toolbar, Typography, Button} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom'

const useStyles = theme => ({
// NavBar Styles
        appBar: {
            backgroundColor:'#eb4034',
            color:'#fff',
            position:'relative'
        },
        root: {
            flexGrow: 1,
            },
            menuButton: {
            marginRight: theme.spacing(5),
            },
            title: {
            flexGrow: 1,
            color:'#643E46FF',
            fontWeight:'bold',
            textDecoration:'none'
            },

            link : {
            color:'#643E46FF',
            fontWeight:'bold',
            '&:hover' :{
                color:'#eb4034',
                backgroundColor:'#643E46FF'
            }
        },
});

class NavBar extends Component {
    render() {
        const { classes } = this.props;
        const text = '</>'
        return (
           <div className={classes.root}>
                <AppBar className={classes.appBar}>
                <Toolbar>
                <Typography component={Link} to='/' variant="h6" className={classes.title}>
                    PH{text}
                </Typography>
                <Button component={Link} to="/register" className={classes.link}>SignUp</Button>
                <Button component={Link} to="/login" className={classes.link}>Login</Button>
                </Toolbar>
            </AppBar>
           </div> 
        )
    }
}

export default withStyles(useStyles)(NavBar);
