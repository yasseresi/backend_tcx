import mongoose from "mongoose";

const MedicalHistorySchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    description: String,
});

const DiagnosisSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    description: String,
});

const PrescriptionSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    medication: {
        type:String,
        default: ""
    },
    dosage:  {
        type:String,
        default: ""
    },
    frequency:  {
        type:String,
        default: ""
    }
});

const TestResultSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    test: String,
    result: String,
});

const PatientSchema = new mongoose.Schema({
    // _id : String,
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    phone: { type: String, required: true },
    doctorId: { type: String, required: true },
    medical_history: [MedicalHistorySchema],
    diagnoses: [DiagnosisSchema],
    prescriptions: [PrescriptionSchema],
    test_results: [TestResultSchema],
},{
    timestamps: true
});


export const Patient = mongoose.model("Patient", PatientSchema, "patients");


