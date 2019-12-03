const express = require('express');
const router = express.Router();

const collectionController = require('./collection/collectionController');

router.post('/collection',collectionController.add);
router.get('/collection',collectionController.findAll);
router.get('/collection/:id',collectionController.findCollectionById);
router.patch('/collection/:id',collectionController.update);
router.delete('/collection/:id',collectionController.delete);

module.exports = router;