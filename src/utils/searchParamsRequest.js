function searchParamsRequest(req, res) {
  if ("favorite" in req.query) {
    return { owner: req.user.id, favorite: req.query.favorite };
  }
  return { owner: req.user.id };
}

module.exports = searchParamsRequest;
