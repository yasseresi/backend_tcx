import express from 'express';
import mongoose from 'mongoose';
import { inscription } from './controllers/inscription.js';
let app = express();
app.use(express.json());

app.post('/inscription', inscription );
// app.post('/login', connexion )



mongoose.connect('mongodb://localhost/DB_TCX')
  .then(() => {
    app.listen(3000, () => console.log('Server is running on port 3000'));
  })
  .catch(error => console.error('Failed to connect to MongoDB', error));