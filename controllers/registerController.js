const mysql = require('mysql2');

// Create a MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodeapps'
});

exports.getRegisterPage = (req, res) => {
    res.render('register', { message: null });
};

exports.registerUser = (req, res) => {
    const { firstname, lastname, email, password, gender, usertype } = req.body;

    // Caesar Cipher encryption of password
    const shift = 3; // shift value for encryption
    let encryptedPassword = '';
    for (let i = 0; i < password.length; i++) {
        let asciiValue = password.charCodeAt(i);
        if (asciiValue >= 65 && asciiValue <= 90) {
            encryptedPassword += String.fromCharCode(((asciiValue - 65 + shift) % 26) + 65); // uppercase letters
        } else if (asciiValue >= 97 && asciiValue <= 122) {
            encryptedPassword += String.fromCharCode(((asciiValue - 97 + shift) % 26) + 97); // lowercase letters
        } else {
            encryptedPassword += password.charAt(i); // non-alphabetic characters
        }
    }
    // Insert user into MySQL database
    const query = `INSERT INTO users (firstname, lastname, email, password, gender, usertype) VALUES (?, ?, ?, ?, ?, ?)`;
    connection.query(query, [firstname, lastname, email, encryptedPassword, gender, usertype], (err, result) => {
        if (err) {
            console.error(err);
            res.render('register', { message: 'Error registering user' });
        } else {
            res.render('login', { message: 'User successfully registered' });
        }
    });


};

