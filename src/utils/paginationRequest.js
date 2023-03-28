const MINPERPAGE = 1;
const MAXPERPAGE = 10;

function paginationRequest(req, res) {
  const { perpage, page } = req.query;
  const perPage =
    +perpage >= MINPERPAGE && +perpage <= MAXPERPAGE ? +perpage : MAXPERPAGE;

  const pagRes = {};
  pagRes.perPage = perPage;
  const cpage = typeof +page === "number" ? +page : 1;
  const skip = (cpage - 1) * pagRes.perPage;
  pagRes.skip = skip;
  return pagRes;
}

module.exports = paginationRequest;
