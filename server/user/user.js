// responsibility – query user db

import bcrypt from 'bcryptjs';
import { UserModel } from "./user-model";

// save new user to db
async function create(attributes) {
  const encryptedPassword = await bcrypt.hash(password, 10);
  const document = {
    email: attributes.email,
    password: encryptedPassword,
    first_name: attributes.first_name,
  };

  return UserModel.create(document);
}

async function findAll() {
  return new Promise((resolve, reject) => {
    UserModel.find({})
      .then(users => resolve(users))
      .catch(error => reject(error));
  })
}

async function findByEmail(email) {
  return new Promise((resolve, reject) => {
    UserModel.findOne({ email })
      .then(user => resolve(user))
      .catch(error => reject(error));
  });
}

async function findUserByCredentials(email, password) {
  const user = await findByEmail(email);

  if(!user) {
    throw new Error("There is no user with such email");
  }

  const match = bcrypt.compare(password, user.password);

  if(!match) {
    throw new Error("Wrong password");
  }

  return user; 
}

export default {
  create,
  findAll,
  findByEmail,
  findUserByCredentials,
}