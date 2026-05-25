const aiService = require('../services/aiService');

class ChatController {
  /**
   * Handle the standard completions POST request.
   */
  async createChatCompletion(req, res, next) {
    const { model, messages, provider, temperature, max_tokens } = req.body;

    // Request Validation
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      const valError = new Error("Invalid request payload. 'messages' must be a non-empty array of objects.");
      valError.status = 400;
      return next(valError);
    }

    try {
      const response = await aiService.generateCompletion(messages, {
        model,
        provider,
        temperature,
        max_tokens,
      });

      return res.status(200).json(response);
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new ChatController();
