import React, { Component } from 'react';
import {connect} from 'react-redux';
import classnames from 'classnames';
import {loginUser} from '../../actions/authActions';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email : '',
            password : '',
            errors : {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(user);
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
          this.props.history.push('/dashboard');
        }
      }
    componentWillReceiveProps(nextProps){
        if(nextProps.auth.isAuthenticated)
        {
            this.props.history.push('/dashboard');
        }
        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }
    }
    render() {
        const {errors} = this.state;
        return (
            <div className="landing">
                <div className="container float-right">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="display-5 mb-4 text-right">UserPicsnUpload</h1>
                            <TextFieldGroup
                            placeholder="Email Address"
                            name="email"
                            type="email"
                            value={this.state.email}
                            onChange={this.onChange}
                            error={errors.email}
                            />
                            <br /><br /><br />
                            <TextFieldGroup
                            placeholder="Password"
                            name="password"
                            type="password"
                            value={this.state.password}
                            onChange={this.onChange}
                            error={errors.password}
                            />
                            <br/><br/><br/>
                            <input type="submit" className="btn btn-primary float-right" />
                            <br /><br /> <br/>
                            <p className="text-right">Don't have an account?<Link to="/register"> Sign Up</Link></p>
                            <br/>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
    

Login.prototypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, {loginUser})(Login);