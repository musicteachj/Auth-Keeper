const User = require('../models/user');

exports.get = function(req, res) {
  User.findById(req.user.id, function(err, user) {
    if (err) { return next(err); }
    if (!user) { return res.status(404).send({ error: 'User not found'}) }
    res.send(user.toJSON());
  })
}

exports.update = function(req, res) {
  User.findByIdAndUpdate(req.user.id, {$set: req.body}, { new: true }, function(err, user) {
    if (err) { return next(err); }
    res.send(user.toJSON());
  })
}

exports.setImage = function(req, res, next) {
  const { imageUrl } = req.body;
  User.findByIdAndUpdate(req.user.id, {$set: {imageUrl}}, { new: true }, function(err, user) {
    if (err) { return next(err); }
    return res.send(user.imageUrl);
  })
}