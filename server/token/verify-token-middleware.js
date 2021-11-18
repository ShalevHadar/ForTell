const jwt = require("jsonwebtoken");

const verifyTokenMiddleware = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  
  if (!token) {
    return res.status(403).send({
      message: "A token is required for authentication",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
    return next();
  } catch (err) {
    return res.status(401).send({
      message: "Invalid Token"
    });
  }
};

export default verifyTokenMiddleware;