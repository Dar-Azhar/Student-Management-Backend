const route = require('express').Router();
const student = require('../Controllers/Student.controller');

route.post('/create', student.createStudent); 
route.get('/get-all', student.getAllStudents); 
route.get('/get/:id', student.getStudentById); 
route.put('/update/:id', student.updateStudent); 
route.delete('/delete/:id', student.deleteStudent); 
route.get('/filter', student.getFilteredStudents); 

module.exports = route;
