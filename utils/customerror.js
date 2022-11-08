class customerror extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  static userNotFound(message) {
    return new customerror(404, message);
  }

  static unauthorizedUser(message) {
    return new customerror(401, message);
  }   
} 

module.exports = customerror;
