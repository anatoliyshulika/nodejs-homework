function searchParamsRequest(req, res) {
  const keys = Object.keys(req.query);
  const exist = keys.includes("favorite");
  if (exist) {
    return { owner: req.user.id, favorite: req.query.favorite };
  }
  return { owner: req.user.id };
}

module.exports = searchParamsRequest;
