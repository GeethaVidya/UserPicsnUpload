import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        handle: '',
        website: '',
        bio: '',
        location: '',
        status: '',
        phoneno: '',
        gender: '',
        errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
      profile.handle = !isEmpty(profile.handle) ? profile.handle : '';
      profile.website = !isEmpty(profile.website) ? profile.website : '';
      profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
      profile.location = !isEmpty(profile.location) ? profile.location : '';
      profile.status = !isEmpty(profile.status) ? profile.status : '';
      profile.phoneno = !isEmpty(profile.phoneno) ? profile.phoneno : '';
      profile.gender = !isEmpty(profile.gender) ? profile.gender : '';

      // Set component fields state
      this.setState({
        handle: profile.handle,
        website: profile.website,
        bio: profile.bio,
        location: profile.location,
        status: profile.status,
        phoneno: profile.phoneno,
        gender: profile.gender,
        user: profile.user.name
    });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
        handle: this.state.handle,
        website: this.state.website,
        bio: this.state.bio,
        location: this.state.location,
        status: this.state.status,
        phoneno: this.state.phoneno,
        gender: this.state.gender,
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    

    // Select options for status
    const statusOptions = [
        { label: '* Select Activity Status', value: 0 },
        { label: 'Active', value: 'Active' },
        { label: 'Inactive', value: 'Inactive' },
        { label: 'Temporarly deactivated account', value: 'Senior Developer' },
      ];
      //Select Gender
      const genderOptions = [
          {label: 'Select Gender', value: 0},
          {label: 'Male', value: 'Male'},
          {label: 'Female', value: 'Female'}
      ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Profile</h1>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
              <div className="form-group row">
                  <label for="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-lg">Name</label>
                    <TextFieldGroup
                    placeholder="Name"
                    name="username"
                    value={this.state.user}
                    onChange={this.onChange}
                    error={errors.username}
                    readonly
                    info=""
                    />
                </div>

                <div className="form-group row">
                    <label for="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-lg">Handle</label>
                    <TextFieldGroup
                    placeholder="* Profile Handle"
                    name="handle"
                    value={this.state.handle}
                    onChange={this.onChange}
                    error={errors.handle}
                    info="A unique handle for your profile URL. Your full name, company name, nickname"
                    />
                </div>
               
                <div className="form-group row">
                <label for="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-lg">Status</label>
                    <SelectListGroup
                    placeholder="Status"
                    name="status"
                    value={this.state.status}
                    onChange={this.onChange}
                    options={statusOptions}
                    error={errors.status}
                    info="Give us an idea of your"
                    />
                </div>
                
                <div className="form-group row">
                    <label for="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-lg">WebSite</label>
                    <TextFieldGroup
                    placeholder="Website"
                    name="website"
                    value={this.state.website}
                    onChange={this.onChange}
                    error={errors.website}
                    info="Could be your own website or a company one"
                    />
                </div>

                <div className="form-group row">
                    <label for="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-lg">Bio</label>&nbsp;&nbsp;&nbsp;
                        <TextAreaFieldGroup
                        placeholder="Short Bio"
                        name="bio"
                        value={this.state.bio}
                        onChange={this.onChange}
                        error={errors.bio}
                        info="Tell us a little about yourself"
                        />
                </div>
                <div className="form-group row">
                    <label for="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-lg">Phone Number</label>
                    <TextFieldGroup
                    placeholder="Phone Number"
                    name="phoneno"
                    value={this.state.phoneno}
                    onChange={this.onChange}
                    error={errors.phoneno}
                    info=""
                    />
                </div>
                <div className="form-group row">
                    <label for="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-lg">Gender</label>
                    <SelectListGroup
                    placeholder="Gender"
                    name="gender"
                    value={this.state.gender}
                    onChange={this.onChange}
                    options={genderOptions}
                    error={errors.gender}
                    info=""
                    />
                </div>
                <div className="form-group row">
                    <label for="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-lg">Location</label>
                    <TextFieldGroup
                    placeholder="Location"
                    name="location"
                    value={this.state.location}
                    onChange={this.onChange}
                    error={errors.location}
                    info="City or city & state suggested (eg. Boston, MA)"
                    />
                </div>
                
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(CreateProfile)
);