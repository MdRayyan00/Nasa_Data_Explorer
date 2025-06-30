import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import nasaRoutes from './routes/nasaRoutes.js';

const app = express();
app.use(cors());
app.use('/api/nasa', nasaRoutes);

// Serve React static files (for deployment)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));