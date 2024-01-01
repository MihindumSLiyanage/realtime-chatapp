const bcrypt = require('bcryptjs');
const users = [

    {
        username: 'Admin',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('123456789'),
    },
    {
        username: 'User',
        email: 'user@gmail.com',
        password: bcrypt.hashSync('123456789'),
    }
];

module.exports = users;
