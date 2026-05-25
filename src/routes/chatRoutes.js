import express from 'express';
import chatController from '../controllers/chatController.js';

const router = express.Router();

// Maps to POST /v1/chat/completions
router.post('/completions', (req, res, next) => {
  chatController.createChatCompletion(req, res, next);
});

export default router;
