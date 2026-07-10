import dotenv from 'dotenv/config';
import authRoutes from './routes/auth.routes.js';
import moviesRoutes from './routes/movies.routes.js'

import express from 'express';
const app = express();
const PORT = process.env.PORT || 8080;

app.use( express.json() );

app.use('/auth',authRoutes);
app.use(moviesRoutes)

app.listen(
    PORT,
    () => {
        console.log(`Server running on http://localhost:${PORT}`)
    }
);