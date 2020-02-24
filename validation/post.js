const Validator = require('validator');
const isImageurl = require('is-image-url');
const isEmpty = require('./is-empty');

module.exports = function ValidatePostInput(data) {
    let errors = {};
    data.imageurl = !isEmpty(data.imageurl) ? data.imageurl : '';
    data.text= !isEmpty(data.text) ? data.comments.text : '';
   
    if(!isImageurl(data.imageurl)){
        errors.imageurl = "Invalid image url";
    }
    
    if(Validator.isEmpty(data.imageurl)) {
        errors.imageurl = "Image field is required";
    }

    if(!Validator.isLength(data.text, {min: 2, max: 40})) {
        errors.text = "Comments should be between 2 and 40 characters";
    }

    if(Validator.isEmpty(data.text)) {
        errors.imageurl = "Image field is required";
    }

    return {
        errors, isValid: isEmpty(errors)
    };
}; 