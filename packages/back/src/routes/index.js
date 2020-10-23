import express from 'express';
import crews from './crews';
import weekSummaries from './week-summaries';
import events from './events';

const router = express.Router();

router.use('/crews', crews);
router.use('/week-summaries', weekSummaries);
router.use('/events', events);
router.get('/foo', (req, res) => res.json({ foo: 'bar' }));

export default router;
