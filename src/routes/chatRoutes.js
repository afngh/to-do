const express = require('express');
const chatController = require('../controllers/chatController');

const router = express.Router();

// Maps to POST /v1/chat/completions
router.post('/chat/completions', (req, res, next) => {
  chatController.createChatCompletion(req, res, next);
});

module.exports = router;
