import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import {loginUser} from '../redux/sessions';

/* -----------------    COMPONENT     ------------------ */

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "", 
      password: "" 
    }

    this.onLoginSubmit = this.onLoginSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    const { message } = this.props;
    console.log("state", this.state, "props", this.props)
    return (
      <div className="signin-container">
        <div className="buffer local">
          <form onSubmit={this.onLoginSubmit}>
            <div className="form-group">
              <label>email</label>
              <input
                name="email"
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
                <label>password</label>
                <input
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  className="form-control"
                  required
                />
            </div>
            <button type="submit" className="btn btn-block btn-primary">{message}</button>
          </form>
        </div>
        <div className="or buffer">
          <div className="back-line">
            <span>OR</span>
          </div>
        </div>
        <div className="buffer oauth">
          <p>
            <a
              target="_self"
              href="/auth/google"
              className="btn btn-social btn-google">
              <i className="fa fa-google" />
              <span>{message} with Google</span>
            </a>
          </p>
        </div>
      </div>
    );
  }

  handleChange(evt){
    console.log("this.props",this.props);
    console.log("event", evt);
    this.setState({[evt.target.name]:evt.target.value});
    

  }

  onLoginSubmit(event) {

    event.preventDefault();
    this.props.loginUser(this.state);
    browserHistory.push('/stories');
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = () => ({ message: 'Log in'});
const mapDispatch = (dispatch)=>{
  return{
      loginUser:function(user){
        dispatch(loginUser(user))
      }
  }
};

export default connect(mapState, mapDispatch)(Login);
