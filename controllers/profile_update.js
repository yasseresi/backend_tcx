import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import { doctorModel } from "../models/doctor.js";
let UpdateProfileInfo =  async (req, res) => {
    const doctorId = req.params._id;
    const updateDoctorInfo = req.body;
    console.log(updateDoctorInfo);

    try {
        // Use findOneAndUpdate to find and update the doctor in a single operation
        const doctor = await doctorModel.findOneAndUpdate(
            { _id: doctorId },
            updateDoctorInfo,
            { new: true, runValidators: true }
        );
        console.log(doctor);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        // Respond with the updated doctor information
        res.json({
            name: doctor.name,
            email: doctor.email,
            description: doctor.description,
            specialty: doctor.specialty,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}


let getProfileInfo =  async (req, res) => {
    const doctorId = req.params._id;
    try {
        const doctor = await doctorModel.findOne({ _id: doctorId });
        console.log(doctor);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        
        const { _id :id ,name: name, email:email, description: description, specialty: specialty ,} = doctor;

        res.status(201).json({
            id,
            name,
            email,
            description,
            specialty,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

let UpdatePassword =  async (req, res) => {
    const doctorId = req.params._id;
    const { oldPassword, newPassword,PasswordConfirm } = req.body;
    try {
        // Use findOne to find the doctor
        const doctor = await doctorModel.findOne({ _id: doctorId });
        console.log(doctor);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        // Compare the password using bcrypt
        const isPasswordValid = await bcrypt.compare(oldPassword, doctor.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        if( newPassword !=PasswordConfirm){
            return res.status(400).json({message : ' The two new Password arn not the same '})
        }
        // Hash the new password
        const hashedPassword = await hashPassword(newPassword);
        // Use findOneAndUpdate to find and update the doctor in a single operation
        const updatedDoctor = await doctorModel.findOneAndUpdate(
            { _id: doctorId },
            { password: hashedPassword },
            { new: true, runValidators: true }
        );
        console.log(updatedDoctor);
        if (!updatedDoctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

async function hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

export {UpdateProfileInfo,getProfileInfo,UpdatePassword};