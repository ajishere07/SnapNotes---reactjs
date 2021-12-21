const jwt = require("jsonwebtoken");
const JWT_SECRET = "anujyadav@1122";

const fetchuser = (req, res, next) => {
  //get the user from the jwt token
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "authenticate using valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (err) {
    res.status(401).send({ error: "authenticate using valid token" });
  }
};

module.exports = fetchuser;
