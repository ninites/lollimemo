class ApiError {
  constructor(code, message) {
    (this.code = code), (this.message = message);
  }

  static unAuth(msg) {
    return new ApiError(401, msg || "not authorized");
  }

  static badRequest(msg) {
    return new ApiError(400, msg);
  }

  static conflict(msg) {
    return new ApiError(409, msg);
  }

  static internal(msg) {
    return new ApiError(500, msg);
  }

  static missFile(msg) {
    return new ApiError(404, msg);
  }

  static emptyBody(msg) {
    return new ApiError(415, msg);
  }
}

module.exports = ApiError;
