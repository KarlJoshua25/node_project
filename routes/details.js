const express = require('express');
const router = express.Router();
const detailsController = require('../controllers/detailsController');

router.get('/details', detailsController.getDetailsPage);
router.post('/details', detailsController.detailsUser);

module.exports = router;