const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

// Root metadata
router.get('/', apiController.getApiOverview);

// Health check
router.get('/health', apiController.getHealth);

// API v1 routes
const v1 = express.Router();

v1.get('/', apiController.getApiOverview);
v1.get('/chapters', apiController.getChapters);
v1.get('/chapters/:chapterId', apiController.getChapterById);
v1.get('/items', apiController.getItems);
v1.get('/items/:id', apiController.getItemById);
v1.get('/search', apiController.search);
v1.get('/random', apiController.getRandom);
v1.get('/audio/:id', apiController.getAudioMetadata);
v1.get('/meta', apiController.getMetadata);
v1.get('/baseurls', apiController.getBaseUrls);

router.use('/api/v1', v1);

module.exports = router;
