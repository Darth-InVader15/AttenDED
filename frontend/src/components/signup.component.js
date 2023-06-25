import React, { Component } from 'react'

export default class SignUp extends Component {
  handleFormSubmit = (event) => {
    event.preventDefault();

    // Get the form values
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
    const instituteName = event.target.elements.instituteName.value;
    const username = event.target.elements.username.value;

    // Make a POST request to the backend API
    axios
      .post('http://localhost:3000/v1/auth/signup', { email, password, instituteName, username })
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
      <form>
        <h3>Sign Up</h3>

        <div className="mb-3">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="choose a cool username"
            name='username'
          />
        </div>

        <div className="mb-3">
          <label>Institute</label>
          <input type="text" className="form-control" placeholder="instituteName" name='instituteName'/>
        </div>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            name='email'
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            name='password'
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
      </form>
    )
  }
}
