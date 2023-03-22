function paginationRequest(req, res) {
  // eslint-disable-next-line camelcase
  const { per_page, page } = req.query;
  const perPage =
    // eslint-disable-next-line camelcase
    +per_page <= +process.env.MINPERPAGE
      ? +process.env.MINPERPAGE
      : +process.env.MAXPERPAGE;

  const pagRes = {};
  pagRes.perPage =
    typeof perPage === "number" ? perPage : +process.env.MINPERPAGE;
  const cpage = typeof +page === "number" ? +page : 1;
  const skip = (cpage - 1) * pagRes.perPage;
  pagRes.skip = skip;
  return pagRes;
}

module.exports = paginationRequest;
