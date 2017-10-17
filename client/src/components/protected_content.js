import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../actions';
import ReactFilestack from 'filestack-react';

class ProtectedContent extends Component {
  componentDidMount() {
    this.props.getProfile();
  }
  handleFormSubmit(formProps) {
    this.props.updateProfile(formProps);
  }
  updateImage(result) {
    this.props.updateProfileImage(result.filesUploaded[0].url);
  }
  render() {
    const { handleSubmit, fields: { email, fullName, city, bio, skill, showEmail }, profileImage} = this.props;
    return (
      <div>
        <h1>Profile</h1>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <fieldset className="form-group">
            <label>Email:</label>
            <input className="form-control" {...email} />
            {email.touched && email.error && <div className="error">{email.error}</div>}
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
          <button action="submit" className="btn btn-primary">Update</button>
        </form>
        <div>
          <h1>Update profile image</h1>
          {profileImage && <img src={profileImage} />}
          <ReactFilestack
            apikey={'AoMq1tYgZR1GppCXTvJtQz'}
            buttonText="Upload image"
            buttonClass="btn btn-primary"
            onSuccess={this.updateImage.bind(this)}
          />
        </div>
      </div>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email';
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
  return { initialValues: state.profile, profileImage: state.profile.imageUrl };
}

export default reduxForm({
  form: 'profile',
  fields: ['email', 'fullName', 'city', 'bio', 'skill', 'showEmail'],
  validate
}, mapStateToProps, actions)(ProtectedContent);
