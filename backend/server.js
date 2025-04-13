const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/signin', (req, res) => {
  const { user_id, password } = req.body;
  db.query(
    'SELECT * FROM user WHERE User_ID = ? AND Password = ?',
    [user_id, password],
    (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.length > 0) {
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ message: 'User not registered or incorrect password' });
      }
    }
  );
});

app.post('/signup', (req, res) => {
  const {
    user_id,
    name,
    contact_number,
    email,
    address,
    aadhaar_number,
    password
  } = req.body;

  db.query(
    'INSERT INTO user (User_ID, Name, Contact_Number, Email, Address, Aadhaar_Number, Password) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [user_id, name, contact_number, email, address, aadhaar_number, password],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(200).json({ message: 'User registered successfully' });
    }
  );
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
