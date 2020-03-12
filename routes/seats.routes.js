const express = require('express');
const router = express.Router();
const SeatController = require('../controllers/seats.controller');

router.get('/seats', SeatController.getAll);
router.get('/seats/random', SeatController.getRandom);
router.get('/seats/:id', SeatController.getById);
router.post('/seats', SeatController.post);
router.put('/seats/:id', SeatController.putById);
router.delete('/seats/:id', SeatController.deleteById);

module.exports = router;