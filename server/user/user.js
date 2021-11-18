import bcrypt from 'bcryptjs';
import { UserModel } from "./user-model";

export async function create(attributes) {
  const encryptedPassword = await bcrypt.hash(password, 10);
  const document = {
    email: attributes.email,
    password: encryptedPassword,
    first_name: attributes.first_name,
  };

  return UserModel.create(document);
}

export async function findAll() {
  return new Promise((resolve, reject) => {
    UserModel.find({})
      .then(users => resolve(users))
      .catch(error => reject(error));
  })
}

export async function findByEmail(email) {
  return new Promise((resolve, reject) => {
    UserModel.findOne({ email })
      .then(user => resolve(user))
      .catch(error => reject(error));
  });
}

export async function checkCredentials(email, password) {
  const user = await findByEmail(email);
  return bcrypt.compare(password, user.password);
}