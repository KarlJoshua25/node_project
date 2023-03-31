const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodeapps'
});

exports.postLogin = (req, res) => {
  const { email, password } = req.body;

  connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, results) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      return res.status(500).send('Error executing query');
    }

    if (results.length > 0) {
      res.render('details');
    } else {
      res.render('login', { errorMessage: 'Invalid Email or Password' });
    }
  });
};
exports.getLogin = (req, res) => {
    res.render('login');
};