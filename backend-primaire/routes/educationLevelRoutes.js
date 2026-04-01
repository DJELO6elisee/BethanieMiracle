const express = require('express');
const router = express.Router();
const educationLevelController = require('../controllers/educationLevelController');
const { auth, checkRole } = require('../middleware/authMiddleware');

// Routes pour les niveaux d'études
router.get('/', auth, checkRole(['admin', 'secretary', 'informaticien']), educationLevelController.getAllEducationLevels);
router.get('/:id', auth, checkRole(['admin', 'secretary', 'informaticien']), educationLevelController.getEducationLevelById);
router.get('/:id/usage', auth, checkRole(['admin', 'secretary', 'informaticien']), educationLevelController.getEducationLevelUsage);
router.get('/:levelId/installments', auth, checkRole(['admin', 'secretary', 'informaticien']), educationLevelController.getLevelInstallmentsDetails);
router.post('/', auth, checkRole(['admin', 'secretary', 'informaticien']), educationLevelController.createEducationLevel);
router.put('/:id', auth, checkRole(['admin', 'secretary', 'informaticien']), educationLevelController.updateEducationLevel);
router.delete('/:id', auth, checkRole(['admin', 'secretary', 'informaticien']), educationLevelController.deleteEducationLevel);
router.get('/:levelId/calculate', auth, checkRole(['admin', 'secretary', 'informaticien']), educationLevelController.calculateLevelInstallments);

module.exports = router;