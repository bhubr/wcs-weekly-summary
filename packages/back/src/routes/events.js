import express from 'express';
// import queryFilterMiddleware from '../middlewares/query-filter';
import db from '../db';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const records = await db.queryAsync(
      'SELECT * FROM event',
    );
    const numRecords = records.length;
    const lastIndex = numRecords - 1;
    return res
      .set('content-range', `events 0-${lastIndex}/${numRecords}`)
      .json(records);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: err.message,
    });
  }
});

export default router;
