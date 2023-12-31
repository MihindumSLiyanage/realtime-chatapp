require('dotenv').config();
const jwt = require('jsonwebtoken');

const signInToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            image: user.image,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '30d',
        }
    );
};

module.exports = {
    signInToken
};
