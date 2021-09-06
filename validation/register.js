const validator = require('validator');

const isEmpty = require('./is-empty')

module.exports = function validateRegisterInput(data){
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";


    // This line of validate the null value
    if(validator.isEmpty(data.name)){
        errors.name = 'Name field is required'
    }
    
    if(validator.isEmpty(data.email)){
        errors.email = 'Email field is required'
    }

    if(validator.isEmpty(data.password)){
        errors.password = 'Password field is required'
    }

    if(validator.isEmpty(data.password2)){
        errors.password2 = 'Confirm password field is required'
    }


    // check the length of then field
    if(!validator.isLength(data.name, {min:2, max:30})){
        errors.name = "Name must be between 2 and 30 characters"
    }

    if(!validator.isLength(data.password, {min:6, max:30})){
        errors.password = 'Password must be between 6 and 30 characters';
    }


    // check if the email is valid
    if(!validator.isEmail(data.email)) {
        errors.email = "Email is not valid"
    }

    // Check if the password and password 2 is ==
    if(!validator.equals(data.password, data.password2)){
        errors.password2 = "Password must match"
    }



    return {errors, isValid:isEmpty(errors)}
}