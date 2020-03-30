
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import { addPost } from '../../actions/postActions';
import axios from 'axios';
import ImageUploader from 'react-images-upload';

class PostForm extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      imageurl: '',
      hashTag: '',
      selectedFile: null,
      errors: {}
    };
  
    this.onUploadHandler = this.onUploadHandler.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  
  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

   
  onUploadHandler = event =>{
   this.setState({
    selectedFile: event.target.files[0],
   });
  }

  onSubmit(e) {
      e.preventDefault();
      
      const data = new FormData();
      data.append('images', this.state.selectedFile,this.state.selectedFile.name);
       axios.post('/feed', data) 
      //   // receive two parameter endpoint url ,form data 
         .then(res => { // then print response status
          console.log(res); 
       });
      
      const { user } = this.props.auth;
      const newPost = {
        imageurl: this.state.selectedFile.name,
        hashTag: this.state.hashTag,
        name:  user.name,
        avatar: user.aavatar
      };
   
    this.props.addPost(newPost);
    this.setState({ imageurl: '' });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Upload Your File</div>
          <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group row">
              <TextFieldGroup
                  placeholder="HashTag"
                  name="hashTag"
                  value={this.state.hashTag}
                  onChange={this.onChange}
                  error={errors.text}
                />
              </div>
            <input type="file" name="file" onChange={this.onUploadHandler} />
          
            <input type="submit" value="Upload" className="btn btn-primary btn-block mt-4" /> 
          </form>
          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addPost })(PostForm);