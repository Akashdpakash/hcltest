// app.js
const express = require('express');
const jwt = require('jsonwebtoken');
const { createHandler } = require('azure-function-express');

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

// Middleware to check JWT
authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access Denied' });
    
    jwt.verify(token.replace('Bearer ', ''), SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid Token' });
        req.user = user;
        next();
    });
};

// Public Route
app.get('/hello', (req, res) => {
    res.json({ message: 'Hello, World!' });
});

// Protected Route
app.get('/protected', authenticateJWT, (req, res) => {
    res.json({ message: 'You have accessed a protected route!', user: req.user });
});

// Generate JWT Token
app.post('/login', (req, res) => {
    const user = { id: 1, name: 'TestUser' };
    const token = jwt.sign(user, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

// Export for Azure Function App
module.exports = createHandler(app);

// Local server for testing
if (require.main === module) {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
