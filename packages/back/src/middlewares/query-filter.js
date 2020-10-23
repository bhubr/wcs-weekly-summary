import db from '../db';

const queryFilterMiddleware = (table) => (req, res, next) => {
  const {
    _end: endStr, _start: startStr, _order: order, _sort: sort,
  } = req.query;
  const end = Number(endStr);
  const start = Number(startStr);
  if (Number.isNaN(end) || Number.isNaN(start)) {
    req.limit = '';
    return next();
  }
  if (order && !/^\w+$/.test(order)) {
    return res.status(400).json('incorrect field name format');
  }
  if (sort && !['ASC', 'DESC'].includes(sort.toUpperCase())) {
    return res.status(400).json('incorrect sorting order');
  }
  req.sort = sort;
  req.order = order;
  const num = end - start;
  req.start = start;
  req.end = end;
  req.limit = `LIMIT ${num} OFFSET ${start}`;
  const sql = `SELECT COUNT(*) AS count FROM ${table}`;
  return db.queryAsync(sql)
    .then(([{ count }]) => {
      req.count = count;
      next();
    });
};

module.exports = queryFilterMiddleware;
