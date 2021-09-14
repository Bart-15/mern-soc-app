import React from 'react'
import {TextField} from '@material-ui/core'
import PropTypes from 'prop-types'

const TextFieldGroup = ({
    name,
    placeholder,
    value, 
    label,
    error,
    info, 
    type, 
    onChange
}) => {
    return (
        <TextField
            error={error ? true : false}
            helperText={error ? error : " "}
            onChange={onChange} 
            name={name} 
            value={value} 
            id="outlined-basic"
            placeholder={placeholder} 
            type={type}
            label={label} 
            variant="outlined" />
    
    )
}

TextFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,

}

export default TextFieldGroup;
