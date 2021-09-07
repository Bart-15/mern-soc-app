const validator = require('validator');

const isEmpty = require('./is-empty')

module.exports = function validateProfileInput(data){
    let errors = {};




    data.handle = !isEmpty(data.handle) ? data.handle : "";
    data.skills = !isEmpty(data.skills) ? data.skills : "";
    data.status = !isEmpty(data.status) ? data.status : "";

    if(validator.isEmpty(data.handle)){
        errors.handle = "Handle field is required";
    }
    if(validator.isEmpty(data.skills)){
        errors.skills = "Skills field is required";
    }
    if(validator.isEmpty(data.status)){
        errors.status = "Status field is required";
    }


    // validate all url's check if valid URL 
    if(!isEmpty(data.website)){
        if(!validator.isURL(data.website, {require_protocol: true})){
            errors.website = "URL is invalid";
        }
    }

    if(!isEmpty(data.youtube)){
        if(!validator.isURL(data.youtube)){
            errors.youtube = "URL is invalid";
        }
    }

    if(!isEmpty(data.twitter)){
        if(!validator.isURL(data.twitter)){
            errors.twitter = "URL is invalid";
        }
    }
    
    if(!isEmpty(data.facebook)){
        if(!validator.isURL(data.facebook)){
            errors.facebook = "URL is invalid";
        }
    }

    if(!isEmpty(data.linkedin)){
        if(!validator.isURL(data.linkedin)){
            errors.linkedin = "URL is invalid";
        }
    }

    if(!isEmpty(data.instagram)){
        if(!validator.isURL(data.instagram)){
            errors.instagram = "URL is invalid";
        }
    }

    return {errors, isValid:isEmpty(errors)}
}