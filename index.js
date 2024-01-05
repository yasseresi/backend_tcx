import express from 'express';
import mongoose from 'mongoose';
import { inscription,j } from './controllers/auth.js';
import { doctorModel } from './models/doctor.js';
import { getProfileInfo,UpdateProfileInfo,UpdatePassword } from './controllers/profile_update.js';
import {Patient} from './models/patient.js';
import  dotenv from 'dotenv';
import joi from 'joi'
import { patient,add_diagnosis,add_medical_history,add_prescriptions,add_test_result,affiche } from './controllers/patient.controller.js';
let app = express();
app.use(express.json());
dotenv.config();
app.post('/inscription', inscription );

app.post('/login', j );

app.get('/profile/:_id',getProfileInfo);

app.put('/profile/:_id',UpdateProfileInfo);


app.put("/profile/password/:_id", UpdatePassword);


app.get('/home',affiche
)

app.post('/patients', patient);


app.post('/patients/add_diagnosis/:id', add_diagnosis)


app.post('/patients/add_medical_history/:id', add_medical_history)

app.post('/patients/add_prescriptions/:id', add_prescriptions
   )

   app.post('/patients/add_test_result/:id',add_test_result 
   )

app.get('/search', async (req, res) => {
    const patients = await Patient.find({
        age: req.query.age,
        // name: { $regex: req.query.name, $options: 'i' },
        // sex: req.query.sex,
        // phone: req.query.phone,
        // doctorId: req.query.doctorId
    });
    res.json({
        patients
    });
});

app.get('/home', async (req, res) => {
    // Get the last three patients added
    const lastThreePatients = await Patient.find().sort({ _id: -1 }).limit(3);

    // Get the number of patients added today
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);
    const patientsAddedToday = await Patient.countDocuments({
        createdAt: { $gte: startOfToday, $lte: endOfToday }
    });

    // Get the number of patients who have never had a diagnosis
    const patientsWithoutDiagnosis = await Patient.countDocuments({ diagnoses: { $exists: true, $eq: [] } });

    // Send the results
    res.json({
        lastThreePatients,
        patientsAddedToday,
        patientsWithoutDiagnosis
    });
});




mongoose.connect('mongodb://localhost/DB_TCX')
    .then(() => {
        app.listen(3000, () => console.log('Server is running on port 3000'));
    })
    .catch(error => console.error('Failed to connect to MongoDB', error));



     