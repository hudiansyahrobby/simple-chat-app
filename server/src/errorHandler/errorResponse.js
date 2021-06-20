// import { logger } from '../helpers/logger';

exports.sendErrorDev = (err, res) => {
  console.log(err);

  res.status(err.status).json({
    message: err.message,
    status: err.status,
    error: {
      message: err.message,
      type: err.type,
    },
    stack: err.stack,
  });
};

exports.sendErrorProd = (err, res) => {
  console.log(err);

  if (err.isOperational) {
    res.status(err.status).json({
      message: err.message,
      status: err.status,
      error: {
        message: err.message,
        type: err.type,
      },
    });

    // Programming or other unknown error
  } else {
    // 1) Log error
    console.log(err);

    // 2) Send generic message
    res.status(500).json({
      message: "Something went very wrong!",
      status: 500,
      error: {
        message: "Something went very wrong!",
        type: "server-error",
      },
    });
  }
};
