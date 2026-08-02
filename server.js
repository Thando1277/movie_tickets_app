import dotenv from 'dotenv/config';
import authRoutes from './routes/auth.routes.js';
import moviesRoutes from './routes/movies.routes.js';
import adminRoutes from './routes/admin.routes.js'

import express from 'express';
const app = express();
const PORT = process.env.PORT || 8080;

app.use( express.json() );

app.use('/auth',authRoutes);
app.use(moviesRoutes);
app.use('/admin',adminRoutes);

app.listen(
    PORT,
    () => {
        console.log(`Server running on http://localhost:${PORT}`)
    }
);