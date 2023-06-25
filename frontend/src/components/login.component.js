import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  handleFormSubmit = (event) => {
    event.preventDefault();

    // Get the form values
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;

    // Make a POST request to the backend API
    axios
      .post('http://localhost:3000/v1/auth/signin', { email, password })
      .then((response) => {
        // Handle the response from the backend
        if (response.status === 200) {
          console.log(response);
          const username = response.data.username;
          this.props.onLogin({ username }); // Call the onLogin function from props with the username
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <h3>Sign In</h3>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            name="email"
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            name="password"
          />
        </div>

        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>
      </form>
    );
  }
}

export default Login;
