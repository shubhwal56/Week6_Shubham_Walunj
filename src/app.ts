import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import bookRoutes from './routes/bookRoutes';
import authorRoutes from './routes/authorRoutes';
import userRoutes from './routes/userRoutes';
import reviewRoutes from './routes/reviewRoutes';
import ratingRoutes from './routes/ratingRoutes';
import orderRoutes from './routes/orderRoutes';
import paymentRoutes from './routes/paymentRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

app.use('/api', bookRoutes);
app.use('/api', authorRoutes);
app.use('/api', userRoutes);
app.use('/api', reviewRoutes);
app.use('/api', ratingRoutes);
app.use('/api', orderRoutes);
app.use('/api', paymentRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
