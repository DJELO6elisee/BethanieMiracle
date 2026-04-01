const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');
const { auth, checkRole } = require('../middleware/auth');

// Routes protégées par authentification
router.use(auth);

// Routes accessibles par tous les utilisateurs authentifiés
router.get('/', checkRole(['admin', 'secretary', 'comptable', 'teacher', 'informaticien']), classController.getAllClasses);
router.get('/:id', checkRole(['admin', 'secretary', 'comptable', 'teacher', 'informaticien']), classController.getClassById);
router.get('/:id/students', checkRole(['admin', 'secretary', 'comptable', 'teacher', 'informaticien']), classController.getClassStudents);
router.get('/:id/courses', checkRole(['admin', 'secretary', 'comptable', 'teacher', 'informaticien']), classController.getClassCourses);
router.get('/:id/subjects', checkRole(['admin', 'secretary', 'comptable', 'teacher', 'informaticien']), classController.getClassSubjects);
router.get('/:id/schedule', checkRole(['admin', 'secretary', 'comptable', 'teacher', 'informaticien']), classController.getClassSchedule);
router.get('/:id/teachers', checkRole(['admin', 'secretary', 'comptable', 'teacher', 'informaticien']), classController.getClassTeachers);
router.get('/:id/grades', classController.getGradesForClass);

// Routes accessibles uniquement par l'admin et le secrétariat
router.post('/', checkRole(['admin', 'secretary', 'informaticien']), classController.createClass);
router.put('/:id', checkRole(['admin', 'secretary', 'informaticien']), classController.updateClass);
router.put('/:id/publish-timetable', checkRole(['admin', 'secretary', 'informaticien']), classController.publishTimetable);
router.delete('/:id', checkRole(['admin', 'informaticien']), classController.deleteClass);

// Routes pour la gestion des inscriptions
router.post('/:id/enroll', checkRole(['admin', 'secretary', 'informaticien']), classController.enrollStudent);
router.post('/:id/unenroll', checkRole(['admin', 'secretary', 'informaticien']), classController.unenrollStudent);

// Notifier les étudiants d'une classe
router.post('/:id/notify-students', checkRole(['teacher']), classController.notifyStudents);

// Transmettre notes & moyennes à l'admin
router.post('/:id/submit-to-admin', checkRole(['teacher']), classController.submitToAdmin);

module.exports = router;