import React, { Component } from 'react';

export default ({email, fullName, city, skill, bio, showEmail, imageUrl}) => (
  <div>
    <p>Full name: {fullName}</p>
    { showEmail && <p>Email: {email}</p> }
    <p>City: {city}</p>
    <p>Bio: {bio}</p>
    <p>Skill: {skill}</p>
    {imageUrl && <img src={imageUrl} />}
  </div>
)
