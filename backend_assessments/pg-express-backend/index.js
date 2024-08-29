require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { Pool } = require('pg');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

const app = express();
const PORT = 3000;

// Middleware setup
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Database connection setup
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

// Passport Local Strategy for user authentication
passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];
    if (!user) return done(null, false, { message: 'Incorrect username.' });
    if (user.password !== password) return done(null, false, { message: 'Incorrect password.' });
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    done(null, result.rows[0]);
  } catch (err) {
    done(err);
  }
});

// Middleware function to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// API Endpoint: Basic JSON Response
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Express and PostgreSQL API!' });
});

// Signup route - create a new user
app.post('/signup', async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const userCheck = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const result = await pool.query(
      'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *',
      [username, password, email]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error signing up user.');
  }
});

// CRUD Operations: Read Users
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving users from database.');
  }
});

// CRUD Operations: Update a User
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { username, password, email } = req.body;
  try {
    const result = await pool.query(
      'UPDATE users SET username = $1, password = $2, email = $3 WHERE id = $4 RETURNING *',
      [username, password, email, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating user.');
  }
});

// CRUD Operations: Delete a User
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
    res.send('User deleted.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting user.');
  }
});

// Login route
app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

// Signout route
app.get('/signout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.send('Signed out successfully.');
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
