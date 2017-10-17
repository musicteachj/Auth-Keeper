import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
  handleFormSubmit(formProps) {
    this.props.signupUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit, fields: { email, password, passwordConfirm, fullName, city, bio, skill, showEmail }} = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <input className="form-control" {...email} />
          {email.touched && email.error && <div className="error">{email.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input className="form-control" {...password} type="password" />
          {password.touched && password.error && <div className="error">{password.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Confirm Password:</label>
          <input className="form-control" {...passwordConfirm} type="password" />
          {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Full name:</label>
          <input className="form-control" {...fullName} />
          {fullName.touched && fullName.error && <div className="error">{fullName.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>City:</label>
          <input className="form-control" {...city} />
          {city.touched && city.error && <div className="error">{city.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Bio:</label>
          <textarea className="form-control" {...bio} />
          {bio.touched && bio.error && <div className="error">{bio.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Skill level:</label>
          <select className="form-control" {...skill}>
            <option value="" default></option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          {skill.touched && skill.error && <div className="error">{skill.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Make email public:</label>
          <input type="checkbox" {...showEmail} />
          {showEmail.touched && showEmail.error && <div className="error">{showEmail.error}</div>}
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign up!</button>
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }

  if (!formProps.fullName) {
    errors.fullName = 'Please enter a full name';
  }

  if (!formProps.city) {
    errors.city = 'Please enter a city';
  }

  if (!formProps.bio) {
    errors.bio = 'Please enter a bio';
  }

  if (!formProps.skill) {
    errors.skill = 'Please enter your skill level';
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm', 'fullName', 'city', 'bio', 'skill', 'showEmail'],
  validate
}, mapStateToProps, actions)(Signup);
