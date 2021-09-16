// express
import express from 'express';

// controller_file
import userController from './controllers/UserController';
import reservationController from './controllers/ReservationController';

// app
const app = express();

// bodyParser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors
import cors from 'cors';
app.use(cors());

// routing
app.use('/api/users', userController);
app.use('/api/reservations', reservationController);

export default app;
