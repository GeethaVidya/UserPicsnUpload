const Validator = require('validator');
const isimageName = require('is-image-url');
const isEmpty = require('./is-empty');

module.exports = function ValidatePostInput(data) {
    let errors = {};
    data.imageurl = !isEmpty(data.imageurl) ? data.imageurl : '';
    //data.text= !isEmpty(data.text) ? data.comments.text : '';
   
    if(!isimageName(data.imageurl)){
        errors.imageurl = "Invalid image url";
    }
    
    if(Validator.isEmpty(data.imageurl)) {
        errors.imageurl = "Image field is required";
    }

     return {
        errors, isValid: isEmpty(errors)
    };
}; 