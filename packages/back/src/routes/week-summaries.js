import express from 'express';
// import queryFilterMiddleware from '../middlewares/query-filter';
import db from '../db';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const records = await db.queryAsync(
      'SELECT * FROM week_summary',
    );
    const events = await db.queryAsync(
      'SELECT * FROM event',
    );
    const summaries = records.map((summary) => ({
      ...summary,
      eventIds: events.reduce(
        (c, e) => (e.weekSummaryId === summary.id ? [...c, e.id] : c),
        [],
      ),
    }));
    const numRecords = summaries.length;
    const lastIndex = numRecords - 1;
    return res
      .set('content-range', `week-summaries 0-${lastIndex}/${numRecords}`)
      .json(summaries);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: err.message,
    });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [record] = await db.queryAsync(
      'SELECT * FROM week_summary WHERE id = ?', [id],
    );
    if (!record) {
      return res.status(404).json({
        error: `No record with id ${id}`,
      });
    }
    const events = await db.queryAsync(
      'SELECT id FROM event WHERE weekSummaryId = ?', [id],
    );
    return res.json({ ...record, eventsIds: events.map(({ id: eventId }) => eventId) });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: err.message,
    });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { startDate, ...rest } = req.body;
  const payload = {
    ...rest,
    startDate: startDate.substr(0, 10),
  };
  try {
    await db.queryAsync(
      'UPDATE week_summary SET ? WHERE id = ?', [payload, id],
    );
    const [record] = await db.queryAsync(
      'SELECT * FROM week_summary WHERE id = ?', [id],
    );
    if (!record) {
      return res.status(404).json({
        error: `No record with id ${id}`,
      });
    }
    return res.json(record);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: err.message,
    });
  }
});

export default router;
