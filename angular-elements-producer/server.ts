import express from 'express';
import cors from 'cors';
import compression from 'compression';
import path from 'node:path';
import fs from 'node:fs';

const app = express();
const PORT = Number(process.env['PORT'] || 4000);

app.use(cors());
app.use(compression());

// Base directory where element bundles are output by Angular build
const elementsRoot = path.resolve(process.cwd(), 'dist', 'elements');

// Health
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// Serve static files for any element name under /elements/:name/*
app.use('/elements', express.static(elementsRoot, { maxAge: '1y', immutable: true, index: false }));

// Endpoint to list available versions/files for an element
app.get('/api/elements/:name', (req, res): void => {
  const name = req.params.name;
  const dir = path.join(elementsRoot, name);
  if (!fs.existsSync(dir)) {
    res.status(404).json({ error: 'Element not found' });
    return;
  }
  const files = fs.readdirSync(dir).filter(f => fs.statSync(path.join(dir, f)).isFile());
  res.json({ name, files });
});

// Simple alias: latest -> serve the main bundle file for the element
app.get('/elements/:name/latest.js', (req, res): void => {
  const name = req.params.name;
  const dir = path.join(elementsRoot, name);
  if (!fs.existsSync(dir)) {
    res.status(404).send('Not found');
    return;
  }
  // Heuristic: pick the smallest js file (typically the entry) or first match
  const jsFiles = fs.readdirSync(dir).filter(f => f.endsWith('.js'));
  if (jsFiles.length === 0) {
    res.status(404).send('No JS bundle found');
    return;
  }
  // Prefer a file named index.js or main.js
  const preferred = jsFiles.find(f => /^(index|main)\.js$/.test(f)) || jsFiles[0];
  res.sendFile(path.join(dir, preferred));
});

app.listen(PORT, () => {
  console.log(`[cdn] listening on http://localhost:${PORT}`);
  console.log(`[cdn] serving elements from: ${elementsRoot}`);
  console.log('[cdn] example: GET /elements/carousel/latest.js');
});
