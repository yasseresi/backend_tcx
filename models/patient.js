import mongoose from "mongoose";

const MedicalHistorySchema = new mongoose.Schema({
    date: Date,
    description: String,
});

const DiagnosisSchema = new mongoose.Schema({
    date: Date,
    description: String,
});

const PrescriptionSchema = new mongoose.Schema({
    date: Date,
    medication: String,
    dosage: String,
    frequency: String,
});

const TestResultSchema = new mongoose.Schema({
    date: Date,
    test: String,
    result: String,
});

const PatientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    phone: { type: String, required: true },
    medical_history: [MedicalHistorySchema],
    diagnoses: [DiagnosisSchema],
    prescriptions: [PrescriptionSchema],
    test_results: [TestResultSchema],
});

const Patient = mongoose.model("Patient", PatientSchema, "patients");

export default Patient;
