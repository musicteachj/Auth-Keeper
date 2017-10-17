const User = require('../models/user');

exports.get = function(req, res, next) {
  const { city, skill } = req.query;
  const query = {};
  if (!city && !skill) { return res.send({error: 'No parameters provided'})}
  if (city) {
    query.city = {$regex: city, $options: 'i'}
  }
  if (skill) {
    query.skill = skill;
  }
  User.find(query, function(err, users) {
    if (err) { return next(err); }
    return res.send(users);
  })
};