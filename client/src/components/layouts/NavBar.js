
import React,  {Component} from 'react'
import {AppBar, Toolbar, Typography, Button} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import {logoutUser} from '../../actions/authActions'
import { clearCurrentProfile } from '../../actions/profileActions';
import {connect} from 'react-redux'

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
    onLogoutClick (e) {
       e.preventDefault();
       this.props.clearCurrentProfile()
       this.props.logoutUser() 
    }
    render() {
        const { classes } = this.props;
        const {isAuthenticated} = this.props.auth; 

        const Guest = () => {
            return (
                <>
                    <Button component={Link} to="/register" className={classes.link}>SignUp</Button>
                    <Button component={Link} to="/login" className={classes.link}>Login</Button>
                </>
            )
        }

        const Auth = () => {
            return (
                <>  
                    <Button type="button" component={Link} to="/dashboard" className={classes.link}>Dashboard</Button>
                    <Button type="button" component={Link} to="/post-feed" className={classes.link}>News Feed</Button>
                    <Button type="button" onClick={this.onLogoutClick.bind(this)} className={classes.link}>Logout</Button>
                </>
            )
        }



        const text = '</>'
        return (
           <div className={classes.root}>
                <AppBar className={classes.appBar}>
                <Toolbar>
                <Typography component={Link} to='/' variant="h6" className={classes.title}>
                    PH{text}
                </Typography>
                {isAuthenticated ? <Auth /> : <Guest />}
                </Toolbar>
            </AppBar>
           </div> 
        )
    }
}
NavBar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    clearCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
    auth: state.auth,
})

export default connect(mapStateToProps, {logoutUser, clearCurrentProfile}) (withStyles(useStyles)(NavBar));
