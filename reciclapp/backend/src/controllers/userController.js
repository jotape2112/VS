const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


exports.register = async (req, res) => {
const { name, email, password } = req.body;
try {
const exists = await User.findOne({ email });
if (exists) return res.status(400).json({ message: 'User exists' });


const salt = await bcrypt.genSalt(10);
const hash = await bcrypt.hash(password, salt);


const user = await User.create({ name, email, password: hash });


const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
} catch (err) {
res.status(500).json({ message: 'Server error' });
}
};


exports.login = async (req, res) => {
const { email, password } = req.body;
try {
const user = await User.findOne({ email });
if (!user) return res.status(400).json({ message: 'Invalid credentials' });


const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });


const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
} catch (err) {
res.status(500).json({ message: 'Server error' });
}
};