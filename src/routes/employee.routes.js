const express = require('express')

const router = express.Router()

const employeeController = require('../controllers/employee.controller')

router.get('/', employeeController.findAll);
router.get('/findbyId/:id', employeeController.findById);
router.post('/add/', employeeController.create);
router.put('/update/:id', employeeController.update);
router.delete('/delete/:id', employeeController.delete);


router.post('/register/', employeeController.register);
router.post('/login/', employeeController.login);

module.exports = router