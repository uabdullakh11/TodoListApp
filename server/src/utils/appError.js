class AppError extends Error {
  constructor(message, status) {
    super(message, status);
    this.message = message;
    this.status = status;
  }
}

export {AppError}