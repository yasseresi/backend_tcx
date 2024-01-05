import mongoose from "mongoose";

const MedicalHistorySchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    description: String,
});

const DiagnosisSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    description: String,
});

const PrescriptionSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    medication: {
        type: String,
        required: true,
        unique: true
    },
    dosage: {
        type: String,
        required: true,
    },
    frequency: {
        type: String,
        required: true,
    },
});

const TestResultSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    test: String,
    result: String,
});

const PatientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    phone: { type: String, required: true },
    doctorId: { type: String, required: true },
    medical_history: [MedicalHistorySchema],
    diagnoses: [DiagnosisSchema],
    prescriptions: [PrescriptionSchema],
    test_results: [TestResultSchema],
});


const MedicalHistory = mongoose.model("MedicalHistory", MedicalHistorySchema);
export const Patient = mongoose.model("Patient", PatientSchema, "patients");


