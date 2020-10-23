// src/app.js
import express from 'express';
import path from 'path';
import cors from 'cors';
import api from './routes';

// Check whether we are in production env
const isProd = process.env.NODE_ENV === 'production';

const app = express();
app.use(express.json());
app.use(cors({
  exposedHeaders: ['Content-Range'],
}));

app.use('/api', api);

if (isProd) {
  // Compute the build path and index.html path
  const buildPath = path.resolve(__dirname, '../../front/build');
  const indexHtml = path.join(buildPath, 'index.html');

  // Setup build path as a static assets path
  app.use(express.static(buildPath));
  // Serve index.html on unmatched routes
  app.get('*', (req, res) => res.sendFile(indexHtml));
}

module.exports = app;
