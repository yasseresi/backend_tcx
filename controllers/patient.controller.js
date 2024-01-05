import { Patient } from "../models/patient.js";
import joi from "joi"



 export const patient = async (req, res) => {
    try {
        const validator = joi.object({
            name: joi.string().required(),
            age: joi.number().integer().min(18).required(),
            gender: joi.string().valid('male', 'female', 'other').required(),
            phone: joi.string().pattern(/^[0-9]{10}$/).required(),
            doctorId: joi.string().allow('').optional()
        });
        const validationResult = validator.validate(req.body)
        if (!validationResult.error) {
            // Extract doctor id from token (req.doctor.id)
            // insert
            const savedPatient = await Patient.create(req.body);
            // 
            res.status(201).json(savedPatient);

        } else {
            // Send error
            return res.status(400).send(validationResult.error)
        }
        // Use the create method to directly create and save the new patient

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}
export const affiche = async (req,res) =>{
    res.json({
        Patient: await Patient.find({}),
    });
}

export const add_diagnosis = async (req, res) => {
    const data = req.body;
    const patientId = req.params.id;
    
    // TODO: Validate
    const validator = joi.object({
        description : joi.string().required()
    });
    const result = validator.validate(req.body);
    
    if(result.error){
        return res.status(400).send(result.error);
    }
    
    // Search for patient
    const patient = await Patient.findById(patientId);
    if (!patient) return res.status(404).send('Patient not found');
    
    // Add to diagnoses
    const updatedPatient = await Patient.updateOne({
        _id: patient._id
    }, {
        $push: {
            diagnoses: data
        }
    }, {
        new: true
    });
    
    if (!updatedPatient) {
        return res.status(500).send('Error updating patient diagnosis');
    }
    
    return res.send("Patient diagnosis updated");}

export const add_medical_history = async (req, res) => {
    const data = req.body;
    const patientId = req.params.id;
    
    // TODO: Validate
    const validator = joi.object({
        description : joi.string().required()
    });
    const result = validator.validate(req.body);
    
    if(result.error){
        return res.status(400).send(result.error);
    }
    
    // Search for patient
    const patient = await Patient.findById(patientId);
    if (!patient) return res.status(404).send('Patient not found');
    
    // Add to diagnoses
    const updatedPatient = await Patient.updateOne({
        _id: patient._id
    }, {
        $push: {
            medical_history: data
        }
    }, {
        new: true
    });
    
    if (!updatedPatient) {
        return res.status(500).send('Error updating patient medical_history');
    }
    
    return res.send("Patient medical history updated");}


export const add_prescriptions = async(req, res) => {
    const data = req.body;
    const patientId = req.params.id;
    
    // TODO: Validate
    const validator = joi.object({
        medication: joi.string().required(),
        dosage: joi.string().required(),
        frequency: joi.string().required()
    });
    const result = validator.validate(req.body);
    
    if(result.error){
        return res.status(400).send(result.error);
    }
    
    // Search for patient
    const patient = await Patient.findById(patientId);
    if (!patient) return res.status(404).send('Patient not found');
    
    // Add to diagnoses
    const updatedPatient = await Patient.updateOne({
        _id: patient._id
    }, {
        $push: {
            prescriptions: data
        }
    }, {
        new: true
    });
    
    if (!updatedPatient) {
        return res.status(500).send('Error updating patient prescriptions');
    }
    
    return res.send("Patient prescription updated");}

    export const add_test_result = async (req, res) => {
        const data = req.body;
        const patientId = req.params.id;
        
        // TODO: Validate
        const validator = joi.object({
            test: joi.string().required(),
            result: joi.string().required()
        });
        const result = validator.validate(req.body);
        
        if(result.error){
            return res.status(400).send(result.error);
        }
        
        // Search for patient
        const patient = await Patient.findById(patientId);
        if (!patient) return res.status(404).send('Patient not found');
        
        // Add to diagnoses
        const updatedPatient = await Patient.updateOne({
            _id: patient._id
        }, {
            $push: {
                test_results: data
            }
        }, {
            new: true
        });
        
        if (!updatedPatient) {
            return res.status(500).send('Error updating patient test result');
        }
        
        return res.send("Patient test result updated");}