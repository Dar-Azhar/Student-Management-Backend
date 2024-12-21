const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors'); 
const prisma = require('./Prisma-client');

dotenv.config();

const app = express();

app.use(cors()); 
app.use(express.json()); 

app.get('/', (req, res) => res.send("Welcome to the Student Management API"));

const studentRoute = require('./Routes/Student');
app.use('/api/student', studentRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
