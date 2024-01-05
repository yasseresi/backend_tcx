import doctorModel from './models/doctor.js';
import bcrypt from 'bcrypt';

   let inscription = async (req, res) => {
    try {
        const { name: username, password: password, email: emailAddress } = req.body;

        // Check if a user with the provided email already exists
        const existingUser = await doctorModel.findOne({ email: emailAddress });
        if (existingUser) {
            return res.status(400).json({ message: 'Doctor with this email already exists' });
        }

        // Hash the password before storing it (use a library like bcrypt)
        const hashedPassword = await hashPassword(password);

        const user = await doctorModel.create({
            name: username,
            password: hashedPassword,
            email: emailAddress
        });

        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
}


async function hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

 const connexion = async (req, res) => {
    try {
        const { email: email, password: password } = req.body;

        // Check if a user with the provided email exists
        const dct = await doctorModel.findOne({ email });
        if (!dct) {
            return res.status(400).json({ message: 'Doctor with this email does not exist' });
        }
        
        // Compare the password using bcrypt
        const isPasswordValid = await bcrypt.compare(password, dct.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        res.send("Login success");
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
}
export {inscription, connexion};

