const express = require('express');
const router = express.Router();
const discountController = require('../controllers/discountController');
const { auth, checkRole } = require('../middleware/auth');

// Routes publiques (accessibles sans authentification)
router.get('/types', discountController.getAllDiscountTypes);
router.get('/student/:studentId', discountController.getStudentDiscounts);
router.get('/student/:studentId/info', discountController.getStudentInfo);
router.get('/student/:studentId/calculate', discountController.calculateStudentDiscounts);
router.get('/payment/:paymentId/history', discountController.getPaymentDiscountHistory);

// Routes protégées (nécessitent une authentification)
router.use(auth);

// Routes pour les types de réductions (admin et secrétaire)
router.post('/types', checkRole(['admin', 'secretary', 'informaticien']), discountController.createDiscountType);

// Routes pour les bons/prises en charge des étudiants (admin et secrétaire)
router.get('/', checkRole(['admin', 'secretary', 'informaticien']), discountController.getAllStudentDiscounts);
router.post('/student', checkRole(['admin', 'secretary', 'informaticien']), discountController.createStudentDiscount);
router.put('/:id/approve', checkRole(['admin', 'secretary', 'informaticien']), discountController.approveStudentDiscount);
router.put('/:id/deactivate', checkRole(['admin', 'secretary', 'informaticien']), discountController.deactivateStudentDiscount);

// Routes pour les applications et statistiques (admin et secrétaire)
router.post('/apply-to-payment', checkRole(['admin', 'secretary', 'informaticien']), discountController.applyDiscountsToPayment);
router.get('/stats', checkRole(['admin', 'secretary', 'informaticien']), discountController.getDiscountStats);

module.exports = router;