const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');
// Create a MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodeapps'
});

// Create Express app
const app = express();

// Use Body Parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
    const query = `SELECT * FROM users WHERE email = ?`;
    connection.query(query, [email], (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Server Error');
        }
    
        if (results.length > 0) {
          return res.render('register', { errmessage: 'Email Already Exist'})
        } else{
           const con = `INSERT INTO users (firstname, lastname, email, password, gender, usertype) VALUES (?, ?, ?, ?, ?, ?)`;
            connection.query(con, [firstname, lastname, email, encryptedPassword, gender, usertype], (err, result) => {
                if (err) {
                    console.error(err);
                    res.render('register', { message: 'Error registering user' });
                } else {
                    res.render('login', { message: 'User successfully registered' });
                }
            });
            
        }
      });
   

   
  // Check if email already exists in database
 

};

