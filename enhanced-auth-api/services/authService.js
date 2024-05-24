const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authService = {
    async registerUser(userData) {
        try {
            // Check if the email is already registered
            const existingUser = await User.findOne({ email: userData.email });
            if (existingUser) {
                throw new Error('Email already registered');
            }

            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(userData.password, salt);

            // Create new user
            const newUser = new User({ ...userData, password: hashedPassword });

            // Save user to database
            await newUser.save();

            // Generate token
            const token = jwt.sign({ _id: newUser._id,isAdmin:newUser.isAdmin }, process.env.JWT_SECRET,{ expiresIn: '1d' });

            return { message: 'User registered successfully', token , newUser};
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async loginUser(userData) {
        try {
            // Check if the email exists
            const user = await User.findOne({ email: userData.email });
            if (!user) {
                throw new Error('Email not found');
            }

            // Validate password
            const validPassword = await bcrypt.compare(userData.password, user.password);
            if (!validPassword) {
                throw new Error('Invalid password');
            }

            // Create and assign a token
            const token = jwt.sign({ _id: user._id ,isAdmin:user.isAdmin}, process.env.JWT_SECRET,{ expiresIn: '1d' });
            return { token };
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async logout(res) {
      try {
        try {
          res.setHeader('Set-Cookie', 'session_id=; Max-Age=0; HttpOnly');
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Logout successful' }));
      } catch (error) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: error.message }));
      }
      } catch (error) {
          throw new Error(error.message);
      }
  },
};

module.exports = authService;
