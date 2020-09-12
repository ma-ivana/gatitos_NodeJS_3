const express = require('express');
const router = express.Router();
const fs = require('fs');
const { getGatitos, getGatitosById, getGatitosByRefugio, postGatitos, putGatitos, deleteGatitos } = require('../controllers/gatitoControllers');


router.get('/', getGatitos);
router.get('/:id', getGatitosById);
router.get(`/:id/refugio/:refugioId`, getGatitosByRefugio);
router.post('/', postGatitos);
router.put('/:id', putGatitos);
router.delete('/:id', deleteGatitos);

module.exports = router;