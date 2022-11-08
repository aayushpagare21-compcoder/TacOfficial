const jwt = require("jsonwebtoken");

class jwtservice {
  static sign(payload, expiry = "30s", secret = process.env.jwtsecret) {
    return jwt.sign(payload, secret, {
      expiresIn: expiry,
    });
  }

  static verify(token, secret = process.env.jwtsecret) {
    return jwt.verify(token, secret);
  }
}

module.exports = jwtservice;
