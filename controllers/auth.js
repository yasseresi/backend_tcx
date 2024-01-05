import { v4 } from 'uuid';
import { doctorModel } from '/Users/Apple/Desktop/backend_tcx/models/doctor.js';
import bcrypt from 'bcrypt';
import Joi from 'joi';
import jwt from 'jsonwebtoken';

let inscription = async (req, res) => {
    const validator = Joi.object({
        name: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string().email().required()
    });

    const validationResult = validator.validate(req.body); // Fix: Use req.body for validation
    if (!validationResult.error) {
        const { name: username, password, email: emailAddress } = req.body;
        const salt = await bcrypt.genSalt(parseInt(process.env.ROUNDS || 10));
        const hash = await bcrypt.hash(password, salt);

        // Check if a user with the provided email already exists
        const existingUser = await doctorModel.findOne({ email: emailAddress });
        if (existingUser) {
            return res.status(400).json({ message: 'Doctor with this email already exists' });
        }

        try {
            // Hash the password before storing it (use a library like bcrypt)
            const doctorId = v4().toString();
            const user = await doctorModel.create({
                _id: doctorId,
                name: username,
                password: hash,
                email: emailAddress,
            });
            res.json({
                status: 'success',
                message: 'Doctor created'
            });
        } catch (e) {
            console.error(e);
            res.status(500).json({
                status: 'error',
                message: "Couldn't create the doctor"
            });
        }
    } else {
        res.status(400).json({
            status: 'error',
            message: 'Validation error'
        });
    }
};

async function hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

let j = async (req, res) => {
    const validator = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });

    const validationResult = validator.validate(req.body);

    if (!validationResult.error) {
        const { email, password } = req.body;

        try {
            // Check if a user with the provided email exists
            const dct = await doctorModel.findOne({ email: email });
            if (!dct) {
                return res.status(404).json({
                    status: 'error',
                    message: `No doctor with email: ${email} was found`,
                });
            }

            // Compare the password using bcrypt
            const isPasswordValid = await bcrypt.compare(password, dct.password);
            if (!isPasswordValid) {
                return res.status(401).json({
                    status: 'error',
                    message: 'Password is incorrect',
                });
            }

            const token = jwt.sign({ id: dct._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

            return res.json({
                status: 'success',
                token,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error',
            });
        }
    } else {
        res.status(401).json({
            status: 'error',
            message: 'Validation error',
        });
    }
};

export { inscription, j };
