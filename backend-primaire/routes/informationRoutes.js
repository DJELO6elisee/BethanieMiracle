const express = require('express');
const router = express.Router();
const informationController = require('../controllers/informationController');
const { auth, checkRole } = require('../middleware/auth');

// Routes protégées par authentification
router.use(auth);

// Routes accessibles par tous les utilisateurs authentifiés
router.get('/', checkRole(['admin', 'secretary', 'teacher', 'student', 'informaticien']), informationController.getAllInformations);
router.get('/:id', checkRole(['admin', 'secretary', 'teacher', 'student', 'informaticien']), informationController.getInformationById);
router.get('/user/:userId/:userRole', checkRole(['admin', 'secretary', 'teacher', 'student', 'informaticien']), informationController.getUserInformations);
router.post('/:informationId/read/:userId', checkRole(['admin', 'secretary', 'teacher', 'student', 'informaticien']), informationController.markAsRead);

// Routes accessibles uniquement par l'admin et le secrétariat
router.post('/', checkRole(['admin', 'secretary', 'informaticien']), informationController.createInformation);
router.put('/:id', checkRole(['admin', 'secretary', 'informaticien']), informationController.updateInformation);
router.delete('/:id', checkRole(['admin', 'secretary', 'informaticien']), informationController.deleteInformation);

// Routes pour la gestion des pièces jointes
router.post('/attachments', checkRole(['admin', 'secretary', 'informaticien']), informationController.addAttachment);
router.delete('/attachments/:id', checkRole(['admin', 'secretary', 'informaticien']), informationController.deleteAttachment);

module.exports = router;