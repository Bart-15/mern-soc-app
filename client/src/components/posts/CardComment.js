import React, { Component } from 'react'
import {Container, Card, CardContent, Typography} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const useStyles = theme => ({
    cardRoot : {
        color:'#333',
        background:' rgba( 13, 3, 3, 0.25 )',
        boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
        backdropFilter: 'blur( 5px )',
        borderRadius: '10px',
        border: '1px solid rgba( 255, 255, 255, 0.18 )',
        margin:'2%'
        },
    image : {
        height :'100px',
        width :'100px',
        marginRight:'10px',
        borderRadius : '100px',
    },
    cardHeader : {
        display : 'flex',
        justifyContent : 'start',
        alignItems : 'center'
    },
    name : {
        fontWeight:'bold'
    },
    text : {
        textIndent:'20px',
        alignItems : 'justify'
    }
})

class CardComment extends Component {
    render() {
        const comments = this.props.comments
        const {classes} = this.props;
        return (
            <Container>
                {
                    comments.map((comment, index) => {
                        return (
                            <Card className={classes.cardRoot}key={index}>
                                <CardContent>
                                    <div className={classes.cardHeader}>
                                        <img className={classes.image} src={comment.avatar} alt="user avatar" />
                                        <Typography className={classes.name} variant="subtitle1">{comment.name}</Typography>
                                    </div>
                                    <Typography className={classes.text} variant="subtitle1">{comment.text}</Typography>
                                </CardContent>
                            </Card>
                        )
                    })
                }
            </Container>
        )
    }
}


export default (withStyles(useStyles)(CardComment));