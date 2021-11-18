const jwt = require("jsonwebtoken");

async function create(id, email, attributes) {
  const payload = {
    sub: id,
    email: email,
    ...attributes,
  };
  const secret = process.env.TOKEN_KEY;

  return jwt.sign(payload, secret, {
    expiresIn: '2h'
  });
}

export {
  create,
}