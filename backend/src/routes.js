const express = require('express');
const router = express.Router();

const collectionController = require('./collection/collectionController');

router.post('/collection',collectionController.add);
router.get('/collection',collectionController.findAll);
router.get('/collection/:id',collectionController.findCollectionById);
router.put('/collection/:id',collectionController.update);
router.delete('/collection/:id',collectionController.delete);

const discController = require('./disc/discController');

router.post('/disc',discController.add);
router.get('/disc/findDiscsByCollectionId/:collectionId',discController.findDiscsByCollectionId);
router.get('/disc/no-collection',discController.findDiscsWihtoutCollection);
router.get('/disc',discController.findAll);
router.get('/disc/:id',discController.findDiscById);
router.put('/disc/:id',discController.update);
router.delete('/disc/:id',discController.delete);

module.exports = router;