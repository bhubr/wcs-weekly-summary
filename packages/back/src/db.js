import mysql from 'mysql2';
import { promisify } from 'util';
import { dbSettings } from './settings';

const pool = mysql.createPool(dbSettings);
pool.queryAsync = promisify(pool.query.bind(pool));

export default pool;
