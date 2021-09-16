import React from 'react'
import {Button} from '@material-ui/core'
import {AiFillEdit} from 'react-icons/ai'
import {BiBookAlt} from 'react-icons/bi'
import {FaUserAlt} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import useStyles from './styles'

const ProfileActions = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Button className={classes.action} component={Link} to="/edit-profile"><AiFillEdit  className={classes.link}/>Edit Profile</Button>
            <Button className={classes.action} component={Link} to="/create-experience"><FaUserAlt className={classes.link} />Add Experience</Button>
            <Button className={classes.action} component={Link} to="/add-education"><BiBookAlt className={classes.link} />Add Education</Button>
        </div>
    )
}

export default ProfileActions;
