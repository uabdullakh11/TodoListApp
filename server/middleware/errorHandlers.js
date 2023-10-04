export function errorHandler(err, req, res, next) {
    let { message, statusCode } = err;
    if (!statusCode) {
      statusCode = 500;
    }
    if (statusCode >= 500) {
      console.error(err);
      message = 'Internal Server Error';
    }
    // if (err instanceof ApiError)
    res.status(statusCode).json({message: err.message, errors: err.errors});
  }
  