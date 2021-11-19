const { UserModel, userSchema } = require('./user-model');
const User = require('./user');

module.exports = {
  userSchema,
  UserModel,
  User,
}