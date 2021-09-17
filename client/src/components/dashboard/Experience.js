import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {deleteEducation} from '../../actions/profileActions'
import {Table, TableContainer, TableHead, TableRow, TableBody, TableCell, Button} from '@material-ui/core'
class Experience extends Component {


    onDelete(id) {
        this.props.deleteEducation(id, this.props.history)
    }
    render() {
        const experience = this.props.experience;
        return (
            <div>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableCell>Company</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Years</TableCell>
                        </TableHead>
                    <TableBody>
                            {
                                experience.map((item)=> {
                                    return <>
                                    <TableRow key={item._id}>
                                        <TableCell>{item.company}</TableCell>
                                        <TableCell>{item.title}</TableCell>
                                        <TableCell>{item.from}</TableCell>
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
    deleteEducation: PropTypes.func.isRequired
}

export default connect(null, {deleteEducation}) ((withRouter)(Experience))