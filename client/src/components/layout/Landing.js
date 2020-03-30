import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Landing extends Component {
    render() {
        return (
            <div className="landing">
                <div className="landing-inner text-dark">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-right">
                            <h1 className="display-4 mb-4">UserPicsnUpload
                            </h1>
                            <Link to="/login" className="btn btn-lg btn-info mr-2">Login</Link>
                            <br /><br />
                            Don't have an account?<Link to="/register"> Sign Up</Link>
                           
                            <br/>
                            
                        </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}
export default Landing;