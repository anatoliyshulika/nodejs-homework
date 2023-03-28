function asyncErrorHandler(fn) {
  return async function (req, res, next) {
    try {
      return await fn(req, res, next);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
}

module.exports = asyncErrorHandler;
