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

exports.getAllUsers = getAllUsers;

const userRegister = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        // Check if all required fields are provided
        if (!name || !email || !password || !phone) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10); // ✅ Ensure password and salt are passed

        // Create new user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword, // ✅ Store hashed password
            phone,
        });

        await newUser.save();

        return res.status(201).json({ message: 'User registered successfully', user: newUser });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.userRegister = userRegister;

// User Login
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Exclude password in the response
        const { password: _, ...userWithoutPassword } = user.toObject();

        return res.status(200).json({ message: 'Login successful', user: userWithoutPassword });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.userLogin = userLogin;
