export const errorHandlerMiddleware = (err, req, res, next) => {
    res.status(err.statusCode || 500).json({
      success: false,
      error: {
        message: err.message || "Server Error",
      },
    });
  };
  