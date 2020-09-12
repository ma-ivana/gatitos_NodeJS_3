const express = require('express');
const router = express.Router();
const fs = require('fs');
const { getUsers, getUserById, postUser, putUser, deleteUser } = require('../controllers/userControllers');



router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', postUser);
router.put('/:id', putUser);
router.delete('/:id', deleteUser);

module.exports = router;
