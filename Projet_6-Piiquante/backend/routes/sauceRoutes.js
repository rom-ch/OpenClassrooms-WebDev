const express = require('express');
const router = express.Router();
const auth = require('./../middleware/auth');
const multer = require('./../middleware/multer-config');

const sauceController = require('./../controllers/sauceController');

router
	.route('/')
	.get(auth, sauceController.getAllSauces)
	.post(auth, multer, sauceController.createSauce);

router
	.route('/:id')
	.get(auth, sauceController.getOneSauce)
	.put(auth, multer, sauceController.modifySauce)
	.delete(auth, sauceController.deleteSauce);

router.route('/:id/like').post(auth, sauceController.likeSauce);

module.exports = router;
