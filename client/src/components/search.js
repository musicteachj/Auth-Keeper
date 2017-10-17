import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import User from './user';
import * as actions from '../actions';

class Search extends Component {
  handleFormSubmit(formProps) {
   if (formProps.city || formProps.skill) {
     this.props.findUsers(formProps);
   }
  }
  render() {
    const { handleSubmit, fields: { city, skill }, users} = this.props;
    const usersList = users.map(user => <User key={user._id} {...user}></User>);
    return (
      <div>
        <h1>Find other users</h1>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <fieldset className="form-group">
            <label>City:</label>
            <input className="form-control" {...city} />
          </fieldset>
          <fieldset className="form-group">
            <label>Skill:</label>
            <select className="form-control" {...skill}>
              <option value="" default></option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </fieldset>
          <button action="submit" className="btn btn-primary">Search</button>
        </form>
        {usersList}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { users: state.users };
}

export default reduxForm({
  form: 'search',
  fields: ['city', 'skill']
}, mapStateToProps, actions)(Search);
