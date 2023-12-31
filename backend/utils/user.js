const bcrypt = require('bcryptjs');
const users = [

    {
        username: 'Admin',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('123456'),
    },
    {
        username: 'Kasun Isuru',
        email: 'kasunis1234@gmail.com',
        password: bcrypt.hashSync('123456'),
    },
];

module.exports = users;
