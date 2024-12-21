const prisma = require("../Prisma-client");

// Create a new student
const createStudent = async (req, res) => {
    try {
        const { name, cohort, courses, status } = req.body;
        const student = await prisma.student.create({
            data: {
                name,
                cohort,
                courses: Array.isArray(courses) ? courses.join(", ") : courses, 
                date_joined: new Date(),
                last_login: new Date(),
                status : true,
            },
        });

        res.status(201).json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
};

// Get a single student
const getStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await prisma.student.findUnique({
            where: { id: parseInt(id) },
        });

        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }

        res.json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a student
const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, cohort, courses, status } = req.body;

        const updatedStudent = await prisma.student.update({
            where: { id: parseInt(id) },
            data: {
                name,
                cohort,
                courses, 
                status,
                last_login: new Date(), 
            },
        });

        res.json(updatedStudent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all students
const getAllStudents = async (req, res) => {
    try {
        const students = await prisma.student.findMany();
        if (!students || students.length === 0) {
            return res.status(404).json("No students found");
        }
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a student
const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.student.delete({
            where: { id: parseInt(id) },
        });

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Filter students by cohort or courses
const getFilteredStudents = async (req, res) => {
    try {
        const { cohort, course } = req.query;

        const students = await prisma.student.findMany({
            where: {
                cohort: cohort || undefined,
                courses: course ? { contains: course } : undefined, 
            },
        });

        if (!students || students.length === 0) {
            return res.status(404).json("No students found");
        }

        res.json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
    getFilteredStudents,
};
