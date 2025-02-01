const userModel = require('../Models/UserModel');
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        return res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const userRegister = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        // Check if the user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            phone
        });

        await newUser.save();
        return res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error registering user' });
    }
};

// ✅ Properly export both functions
module.exports = {
    getAllUsers,
    userRegister
};
