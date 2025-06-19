import express from 'express';
import cors from 'cors';

import nasaRoutes from './routes/nasaRoutes.js';


const app = express();
app.use(cors());
app.use('/api/nasa', nasaRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
