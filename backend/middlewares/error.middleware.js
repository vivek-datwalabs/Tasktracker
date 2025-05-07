export const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);
    res.status(res.statusCode !== 200 ? res.statusCode : 500).json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
  };
  