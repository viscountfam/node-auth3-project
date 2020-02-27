const express = require ('express');
const bcrypt = require('bcryptjs')
const Users = require('./auth-model.js')
const jwt = require('jsonwebtoken')
const router = express.Router()

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10); 
    user.password = hash;
  
    Users.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
  
  router.post('/login', (req, res) => {
    let { username, password } = req.body;
  
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);
  
          res.status(200).json({
            message: `Welcome ${user.username}!`,
            token,
          });
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch(({name, stack, code, message}) => {
        res.status(500).json({name: name, stack: stack, code: code, message: message});
      });
  });

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
    }

    const secret = process.env.JWT_SECRET || "is it secret, is it safe"

    const options = {
        expiresIn: '1h'
    }

    return jwt.sign(payload, secret, options)
}

module.exports = router