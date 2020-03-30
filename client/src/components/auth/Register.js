import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import classnames from 'classnames';
import {registerUser} from '../../actions/authActions';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
    constructor(){
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }

        this.props.registerUser(newUser, this.props.history);
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
          this.props.history.push('/create-profile');
        }
      }
    
    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }
    }

    render() {
        const {errors} = this.state;
        const {user} = this.props.auth;
        return (
            <div className="register">
                {user ? user.name : null}
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                        <h1 className="display-5 text-center">UserPicsnUpload</h1>
                        <p className="lead text-center">Sign up to see photos and videos from your friends</p>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="form-group row">
                            <TextFieldGroup
                            placeholder="Name"
                            name="name"
                            value={this.state.name}
                            onChange={this.onChange}
                            error={errors.name}
                            />
                            </div>
                            <div className="form-group row">
                                <TextFieldGroup
                                placeholder="Email"
                                name="email"
                                type="email"
                                value={this.state.email}
                                onChange={this.onChange}
                                error={errors.email}
                                info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                                />
                            </div>
                            <div className="form-group row">
                                <TextFieldGroup
                                placeholder="Password"
                                name="password"
                                type="password"
                                value={this.state.password}
                                onChange={this.onChange}
                                error={errors.password}
                                />
                            </div>
                            <div className="form-group row">
                                <TextFieldGroup
                                placeholder="Confirm Password"
                                name="password2"
                                type="password"
                                value={this.state.password2}
                                onChange={this.onChange}
                                error={errors.password2}
                                />
                            </div>
                            <input type="submit" className="btn btn-primary btn-block mt-4" />
                            <br />
                           <p className = "text-center">Have an account? <Link to="/login">Login</Link></p>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
Register.prototypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, {registerUser}) (withRouter(Register));