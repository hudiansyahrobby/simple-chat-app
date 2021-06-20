module.exports = class AppError extends Error {
  constructor(message, status, type) {
    super(message);

    this.status = status;
    this.type = type;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
};
