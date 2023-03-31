const mysql = require('mysql2');

// Create a MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodeapps'
});

// Affine cipher encryption function
function affineEncrypt(text, a, b) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const m = alphabet.length;
    const modInverse = (a * 8) % m;
    let cipher = "";
    for (let i = 0; i < text.length; i++) {
        const char = text[i].toUpperCase();
        if (alphabet.includes(char)) {
            const x = alphabet.indexOf(char);
            const y = ((a * x) + b) % m;
            cipher += alphabet[y];
        } else {
            cipher += char;
        }
    }
    return cipher;
}

exports.getDetailsPage = (req, res) => {
    res.render('details', { message: null });
};

exports.detailsUser = (req, res) => {
    const { firstname, middlename, lastname, birthdate, gender, civilstatus, hobby, address, region, city, zipcode } = req.body;


    // Encrypt firstname and lastname using Affine cipher
    const a = 5; // Affine cipher parameter
    const b = 7; // Affine cipher parameter
    const encryptedFirstname = affineEncrypt(firstname, a, b);
    const encryptedLastname = affineEncrypt(lastname, a, b);




    const con = `INSERT INTO personalinfo (firstname, middlename, lastname, birthdate, gender, civilstatus, hobby, address, region, city, zipcode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    connection.query(con, [encryptedFirstname, middlename, encryptedLastname, birthdate, gender, civilstatus, hobby, address, region, city, zipcode], (err, result) => {
        if (err) {
            console.error(err);
            res.render('details', { message: 'Error registering user' });
        } else {
            res.render('details', { message: 'User successfully registered' });
        }



    });

};

