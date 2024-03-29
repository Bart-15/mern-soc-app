import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {deleteExp} from '../../actions/profileActions'
import {Table, TableContainer, TableHead, TableRow, TableBody, TableCell, Button} from '@material-ui/core'
import Moment from 'react-moment'
class Experience extends Component {


    onDelete(id) {
        this.props.deleteExp(id, this.props.history)
    }
    render() {
        const experience = this.props.experience;
        return (
            <div>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableCell>Company</TableCell>
                            <TableCell>Job Title</TableCell>
                            <TableCell>Years</TableCell>
                        </TableHead>
                    <TableBody>
                            {
                                experience.map((item)=> {
                                    return <>
                                    <TableRow key={parseInt(item._id)}>
                                        <TableCell>{item.company}</TableCell>
                                        <TableCell>{item.title}</TableCell>
                                        <TableCell>
                                            <Moment format="YYYY/MM/DD">
                                                {item.from}    
                                            </Moment> 
                                            -
                                            {' '} 
                                            <Moment format="YYYY/MM/DD">
                                                {item.to}
                                            </Moment>
                                        </TableCell>
                                        <TableCell><Button type="button" onClick={this.onDelete.bind(this, item._id)} color="secondary" variant="contained">Delete</Button></TableCell>
                                    </TableRow>
                                    </>
                                })
                            }
                    </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}

Experience.propTypes = {
    deleteExp: PropTypes.func.isRequired
}

export default connect(null, {deleteExp}) ((withRouter)(Experience))