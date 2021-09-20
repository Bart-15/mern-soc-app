import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {deleteEducation} from '../../actions/profileActions'
import {Table, TableContainer, TableHead, TableRow, TableBody, TableCell, Button} from '@material-ui/core'
import Moment from 'react-moment'
class Education extends Component {


    onDelete(id) {
        this.props.deleteEducation(id, this.props.history)
    }
    render() {
        const education = this.props.education;
        return (
            <div>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableCell>School</TableCell>
                            <TableCell>Degree</TableCell>
                            <TableCell>Years</TableCell>
                        </TableHead>
                    <TableBody>
                            {
                                education.map((item)=> {
                                    return <>
                                    <TableRow key={parseInt(item._id)}>
                                        <TableCell>{item.school}</TableCell>
                                        <TableCell>{item.degree}</TableCell>
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

Education.propTypes = {
    deleteEducation: PropTypes.func.isRequired
}

export default connect(null, {deleteEducation}) ((withRouter)(Education))