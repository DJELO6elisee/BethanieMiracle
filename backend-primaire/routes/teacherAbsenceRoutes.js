const express = require('express');
const router = express.Router();
const teacherAbsenceController = require('../controllers/teacherAbsenceController');
const { auth, checkRole } = require('../middleware/auth');

// Auth obligatoire
router.use(auth);

// Lister toutes les absences enseignants (admin, secretary)
router.get('/', checkRole(['admin', 'secretary', 'informaticien']), teacherAbsenceController.getAll);

// Absences d'un enseignant (admin, secretary, teacher)
router.get('/teacher/:id', checkRole(['admin', 'secretary', 'teacher', 'informaticien']), teacherAbsenceController.getByTeacher);

// Créer une absence enseignant (admin, secretary)
router.post('/', checkRole(['admin', 'secretary', 'informaticien']), teacherAbsenceController.create);

// Supprimer une absence enseignant (admin)
router.delete('/:id', checkRole(['admin']), teacherAbsenceController.remove);

module.exports = router;