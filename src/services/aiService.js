const groqProvider = require('../providers/groq');

class AIService {
  constructor() {
    // Model alias mapping for standardization
    this.modelMap = {
      'llama': 'llama-3.1-8b-instant',
      'llama-large': 'llama-3.3-70b-versatile',
      'llama-small': 'llama-3.1-8b-instant',
    };
  }

  /**
   * Generates a chat completion using the requested provider & model.
   * @param {Array} messages - Chat context/history
   * @param {Object} options - Provider/model parameters (e.g., model name, temperature)
   * @returns {Promise<Object>} - Normalized response
   */
  async generateCompletion(messages, options = {}) {
    const rawModel = options.model || 'llama';
    
    // Standardize to matching provider-specific model name
    const targetModel = this.modelMap[rawModel.toLowerCase()] || rawModel;
    
    // Choose provider (extendable for OpenRouter / OpenAI etc. in the future)
    const provider = options.provider || 'groq';

    if (provider === 'groq') {
      const response = await groqProvider.generateCompletion(messages, {
        ...options,
        model: targetModel,
      });

      // Format response precisely to the standard structure requested:
      // success, provider, model, content
      return {
        success: response.success,
        provider: 'groq',
        model: rawModel, // return the original model alias requested by the client
        content: response.content,
      };
    } else {
      const unsupportedErr = new Error(`AI Provider '${provider}' is not currently supported.`);
      unsupportedErr.status = 400;
      throw unsupportedErr;
    }
  }
}

module.exports = new AIService();
