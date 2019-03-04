import _ from 'lodash';
import User from '../models/user.model';
import getErrorMessage from '../helpers/dbErrorHandler';

/* eslint array-callback-return: "off" */

const create = (req, res) => {
  const user = new User(req.body);
  user.save((err) => {
    if (err) {
      return res.status(400).json({
        error: getErrorMessage(err),
      });
    }
    res.status(200).json({
      message: 'Successfully signed up!',
    });
  });
};

const list = (req, res) => {
  User.find((err, users) => {
    if (err) {
      return res.status(400).json({
        error: getErrorMessage(err),
      });
    }
    res.json(users);
  }).select('name email updated created');
};

const userByID = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status('400').json({
        error: 'User not found',
      });
    }
    req.profile = user;
    next();
  });
};

const read = (req, res) => {
  req.profile.password_digest = undefined;
  return res.json(req.profile);
};

const update = (req, res) => {
  let user = req.profile;
  user = _.extend(user, req.body);
  user.updated = Date.now();
  user.save((err) => {
    if (err) {
      return res.status(400).json({
        error: getErrorMessage(err),
      });
    }
    user.password_digest = undefined;
    res.json(user);
  });
};

const remove = (req, res) => {
  const user = req.profile;
  user.remove((err, deletedUser) => {
    if (err) {
      return res.status(400).json({
        error: getErrorMessage(err),
      });
    }
    deletedUser.password_digest = undefined; //eslint-disable-line
    res.json(deletedUser);
  });
};

export default {
  create,
  userByID,
  read,
  list,
  remove,
  update,
};
