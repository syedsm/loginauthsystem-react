const Auth = require('../models/Auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.reg = async (req, res) => {
  console.log(req.body)
  // console.log(req.file)
  // console.log(data)
  const data = req.body;

  try {
    const userCheck = await Auth.findOne({ email: data.email});

    if (!userCheck) {
      const hashedPassword = await bcrypt.hash(data.password, 10);

      let newUser;

      if (req.file) {
        newUser = new Auth({
          username: data.username,
          email: data.email,
          password: hashedPassword,
          name: data.name,
          img: req.file.filename,
        });
      } else {
        newUser = new Auth({
          username: data.username,
          email: data.email,
          password: hashedPassword,
          name: data.name,
        });
      }

      // console.log(newUser);
      await newUser.save();

     
    }
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    const user = await Auth.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Set the expiration time as needed
    );

    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.profile = async (req, res) => {
  try {
    const record = await Auth.find()
    res.json({
      status: 200,
      data: record,
      message: "Successfully data fetched",
    })
  } catch (error) {
    res.json({
      status: 400,
      message: error.message
    })
  }
}
