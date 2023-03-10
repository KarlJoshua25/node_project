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
      res.render('home');
    } else {
      res.render('login', { errorMessage: 'Invalid username or password' });
    }
  });
};
exports.getLogin = (req, res) => {
    res.render('login');
};