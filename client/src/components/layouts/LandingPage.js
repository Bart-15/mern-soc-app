import React, {Component} from 'react'
import {Typography, Button} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import image from '../../img/landing.jpg'
import {Link} from 'react-router-dom'
import  PropTypes  from 'prop-types'
import {connect} from 'react-redux'
const useStyles = theme => ({
    root : {
        background:`linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${image})`,
        width: '100%',
        height:'100vh',
        backgroundPostion:'center',
        backgroundRepeat:'no-repeat',
        backgroundSize:'cover',
        position:'relative'

    },

    textContainer : {
        textAlign:'center',
        position:'absolute',
        top:'50%',
        left:'50%',
        transform:'translate(-50%, -50%)',
        color:'#fff',
    },

    btn : {
        backgroundColor:'#643E46FF',
        color:'#eb4034',
        marginRight:'4px',
        fontWeight:'bold',
        fontSize:'18px',
        textDecoration:'none',
       
    },
    

});

class LandingPage extends Component {
    componentDidMount() {
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard')
        }
    }
    render() {
        const {classes} = this.props;
        return (
            <>
               <div className={classes.root}>
                <div className={classes.textContainer}>
                    <Typography variant="h1">PhCODER</Typography>
                    <Typography variant="h6">Create a developer profile/portfolio, share posts and get help from other filipino developer.</Typography>
                    <div>
                        <Button component={Link} to="/register" className={classes.btn}>SignUp</Button>
                        <Button component={Link} to="/login" className={classes.btn}>Login</Button>
                    </div>
                </div>
               </div> 
            </>
        )
    }
}

LandingPage.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps) (withStyles(useStyles)(LandingPage));