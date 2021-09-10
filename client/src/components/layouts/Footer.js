import React, { Component } from 'react'
import { withStyles } from '@material-ui/core'
import {Typography} from '@material-ui/core'

const useStyles = theme => ({
    root : {
        backgroundColor:'#eb4034',
        color:'#fff',
        display : 'flex',
        height:'50px',
        flexDirection : 'column',
        justifyContent : 'center',
        alignItems : 'center',
    }
})


class Footer extends Component {
    render() {
        const {classes} = this.props;
        const date = new window.Date().getFullYear();
        
        return (
            <div className={classes.root}>
                <Typography variant="subtitle1">Copyright &copy; Bart Tabusao {date}</Typography>
            </div>
        )
    }
}


export default withStyles(useStyles)(Footer)